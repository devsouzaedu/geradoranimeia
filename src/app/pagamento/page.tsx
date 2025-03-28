"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { criarPixQRCode, verificarStatusPix, processarPagamentoCartao } from "../lib/abacatepay";

export default function Pagamento() {
  const router = useRouter();
  const [metodo, setMetodo] = useState<"pix" | "cartao">("pix");
  const [carregando, setCarregando] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [pixCopiaECola, setPixCopiaECola] = useState("");
  const [statusPagamento, setStatusPagamento] = useState("");
  const [pixId, setPixId] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  
  // Dados do cartão
  const [numeroCartao, setNumeroCartao] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  const [validadeCartao, setValidadeCartao] = useState("");
  const [cvvCartao, setCvvCartao] = useState("");
  
  // Função para criar um QR Code PIX
  const criarCobrancaPix = async () => {
    setCarregando(true);
    setMensagemErro("");
    try {
      const resultado = await criarPixQRCode({
        valor: 19.90,
        descricao: "Transformação de foto em anime",
        referencia: "ANIMEFY" + Date.now()
      });
      
      setQrCodeUrl(resultado.qrcode_url);
      setPixCopiaECola(resultado.qrcode_text);
      setStatusPagamento("pendente");
      setPixId(resultado.id);
    } catch (error) {
      console.error("Erro ao criar cobrança PIX:", error);
      setStatusPagamento("erro");
      setMensagemErro("Não foi possível gerar o QR Code. Por favor, tente novamente.");
    } finally {
      setCarregando(false);
    }
  };
  
  // Verificar status do pagamento PIX
  // Usando useCallback para evitar recriação da função a cada renderização
  const verificarPagamentoPix = useCallback(async () => {
    if (!pixId || statusPagamento !== "pendente") return;
    
    try {
      const resultado = await verificarStatusPix(pixId);
      
      if (resultado.status === "pago") {
        setStatusPagamento("pago");
        // Redirecionar para página de sucesso após 1 segundo
        setTimeout(() => {
          router.push("/sucesso");
        }, 1000);
      }
    } catch (error) {
      console.error("Erro ao verificar status do PIX:", error);
    }
  }, [pixId, statusPagamento, router]);
  
  // Processar pagamento com cartão
  const processarCartao = async (evento: React.FormEvent) => {
    evento.preventDefault();
    setCarregando(true);
    setMensagemErro("");
    
    try {
      const resultado = await processarPagamentoCartao({
        valor: 19.90,
        descricao: "Transformação de foto em anime",
        referencia: "ANIMEFY" + Date.now(),
        cartao: {
          numero: numeroCartao,
          nome: nomeCartao,
          validade: validadeCartao,
          cvv: cvvCartao
        }
      });
      
      if (resultado.status === "aprovado") {
        router.push("/sucesso");
      } else {
        setMensagemErro(resultado.mensagem || "Pagamento recusado. Por favor, verifique os dados do cartão.");
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      setMensagemErro("Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.");
    } finally {
      setCarregando(false);
    }
  };
  
  // Iniciar verificação periódica do status do PIX
  useEffect(() => {
    if (metodo === "pix") {
      criarCobrancaPix();
    }
  }, [metodo]);
  
  // Verificar status do PIX a cada 5 segundos
  useEffect(() => {
    if (pixId && statusPagamento === "pendente") {
      const intervalo = setInterval(verificarPagamentoPix, 5000);
      return () => clearInterval(intervalo);
    }
  }, [pixId, statusPagamento, verificarPagamentoPix]);
  
  return (
    <div className="relative min-h-screen flex flex-col items-center p-8">
      {/* Background com imagem, overlay e blur */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/bg_anime.jpg')" }}></div>
        <div className="absolute inset-0 backdrop-blur-md bg-white/70"></div>
      </div>
      
      <header className="my-8 z-10 relative">
        <h1 className="text-4xl font-bold text-center text-purple-800">Finalizar Compra</h1>
        <p className="mt-2 text-center text-gray-600">Escolha como deseja pagar sua transformação</p>
      </header>
      
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg z-10 relative">
        <div className="flex justify-between mb-6 border-b pb-4">
          <button 
            className={`px-4 py-2 ${metodo === "pix" ? "text-purple-600 border-b-2 border-purple-600 font-medium" : "text-gray-500"}`}
            onClick={() => setMetodo("pix")}
          >
            PIX
          </button>
          <button 
            className={`px-4 py-2 ${metodo === "cartao" ? "text-purple-600 border-b-2 border-purple-600 font-medium" : "text-gray-500"}`}
            onClick={() => setMetodo("cartao")}
          >
            Cartão de Crédito
          </button>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Transformação de foto</span>
            <span className="font-medium">R$ 19,90</span>
          </div>
          <div className="flex justify-between text-sm font-medium">
            <span>Total</span>
            <span>R$ 19,90</span>
          </div>
        </div>
        
        {mensagemErro && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {mensagemErro}
          </div>
        )}
        
        {metodo === "pix" ? (
          <div className="flex flex-col items-center mt-6">
            {carregando ? (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-t-purple-600 border-purple-200 rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Gerando QR Code...</p>
              </div>
            ) : statusPagamento === "pendente" ? (
              <>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  {qrCodeUrl && (
                    <Image src={qrCodeUrl} alt="QR Code PIX" width={200} height={200} className="mx-auto" />
                  )}
                </div>
                <div className="w-full mb-4">
                  <p className="text-sm text-gray-600 mb-2">PIX Copia e Cola:</p>
                  <div className="flex">
                    <input 
                      type="text" 
                      value={pixCopiaECola} 
                      readOnly 
                      className="w-full text-xs p-2 border border-gray-300 rounded-l-md bg-gray-50"
                    />
                    <button 
                      className="bg-purple-600 text-white px-3 py-2 rounded-r-md"
                      onClick={() => {
                        navigator.clipboard.writeText(pixCopiaECola);
                        alert("Código PIX copiado!");
                      }}
                    >
                      Copiar
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 text-center mt-4">
                  Abra o aplicativo do seu banco, escaneie o QR Code ou cole o código PIX para finalizar o pagamento.
                </p>
              </>
            ) : statusPagamento === "pago" ? (
              <div className="text-center text-green-600">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="font-medium">Pagamento confirmado!</p>
                <p className="text-sm mt-2">Redirecionando...</p>
              </div>
            ) : (
              <div className="text-center text-red-600">
                <p>Ocorreu um erro ao gerar o QR Code. Por favor, tente novamente.</p>
                <button 
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md"
                  onClick={criarCobrancaPix}
                >
                  Tentar novamente
                </button>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={processarCartao} className="mt-6">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Número do Cartão
              </label>
              <input 
                type="text" 
                placeholder="0000 0000 0000 0000" 
                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                value={numeroCartao}
                onChange={(e) => setNumeroCartao(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Validade
                </label>
                <input 
                  type="text" 
                  placeholder="MM/AA" 
                  className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  value={validadeCartao}
                  onChange={(e) => setValidadeCartao(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input 
                  type="text" 
                  placeholder="123" 
                  className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  value={cvvCartao}
                  onChange={(e) => setCvvCartao(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Nome no Cartão
              </label>
              <input 
                type="text" 
                placeholder="Nome completo" 
                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                value={nomeCartao}
                onChange={(e) => setNomeCartao(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium"
              disabled={carregando}
            >
              {carregando ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-4 border-t-white border-white/30 rounded-full animate-spin mr-2"></div>
                  Processando...
                </span>
              ) : (
                "Pagar R$ 19,90"
              )}
            </button>
          </form>
        )}
      </div>
      
      <footer className="mt-8 text-center text-gray-500 text-sm z-10 relative">
        <p>© 2024 Gerador de Foto Anime - Todos os direitos reservados</p>
        <p className="mt-1">Pagamentos processados com segurança pela AbacatePay</p>
      </footer>
    </div>
  );
} 