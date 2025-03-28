"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { criarPixQRCode } from "../lib/abacatepay";

export default function Instrucoes() {
  const router = useRouter();
  const [pixCopiaECola, setPixCopiaECola] = useState("");
  const [carregando, setCarregando] = useState(true);
  
  useEffect(() => {
    // Gerar apenas o código PIX copia e cola quando a página carregar
    const gerarCodigoPix = async () => {
      try {
        const resultado = await criarPixQRCode({
          valor: 20.00,
          descricao: "Transformação de foto em anime",
          referencia: "ANIMEFY" + Date.now()
        });
        
        setPixCopiaECola(resultado.qrcode_text);
        setCarregando(false);
      } catch (error) {
        console.error("Erro ao gerar código PIX:", error);
        setCarregando(false);
      }
    };
    
    gerarCodigoPix();
  }, []);
  
  return (
    <div className="relative min-h-screen flex flex-col items-center p-8">
      {/* Background com imagem, overlay e blur */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/bg_anime.jpg')" }}></div>
        <div className="absolute inset-0 backdrop-blur-md bg-white/70"></div>
      </div>
      
      <header className="my-8 z-10 relative">
        <h1 className="text-4xl font-bold text-center text-purple-800">Quase lá!</h1>
      </header>
      
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg z-10 relative">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-800 mb-4">
            Seu design está ficando pronto para ser enviado. Para continuar, PAGUE R$20,00 e envie o QR-code abaixo para <span className="font-semibold">dev.souzaedu@gmail.com</span>.
          </p>
          <p className="text-md text-gray-600">
            Sua foto ficará pronta em alguns minutos após a confirmação do pagamento.
          </p>
        </div>
        
        {carregando ? (
          <div className="flex justify-center mb-8">
            <div className="w-10 h-10 border-4 border-t-purple-600 border-purple-200 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              {/* Usando a imagem estática ao invés da gerada dinamicamente */}
              <Image 
                src="/img qr code.jpg" 
                alt="QR Code PIX" 
                width={250} 
                height={250} 
                className="mx-auto" 
              />
            </div>
            
            <div className="w-full mb-6">
              <p className="text-sm text-gray-600 mb-2 text-center">PIX Copia e Cola:</p>
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
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">Instruções:</h2>
          <ol className="list-decimal pl-5 space-y-3 text-gray-700">
            <li>Faça o pagamento de R$20,00 usando o QR Code PIX acima</li>
            <li>Após o pagamento, tire um print do comprovante ou salve-o</li>
            <li>Envie o comprovante para <span className="font-semibold">dev.souzaedu@gmail.com</span></li>
            <li>Mencione seu email usado no cadastro na mensagem</li>
            <li>Aguarde alguns minutos para receber sua imagem transformada</li>
          </ol>
        </div>
        
        <button
          onClick={() => router.push("/")}
          className="w-full px-4 py-3 mt-8 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium"
        >
          Voltar para o início
        </button>
      </div>
      
      <footer className="mt-8 text-center text-gray-500 text-sm z-10 relative">
        <p>© 2024 Gerador de Foto Anime - Todos os direitos reservados</p>
        <p className="mt-1">Pagamentos processados com segurança pela AbacatePay</p>
      </footer>
    </div>
  );
} 