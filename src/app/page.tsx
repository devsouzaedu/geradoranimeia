"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [imagem, setImagem] = useState<File | null>(null);
  const [estilo, setEstilo] = useState("anime");
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  
  // Função para lidar com o upload da imagem
  const handleImagemUpload = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = evento.target.files?.[0];
    if (arquivo) {
      setImagem(arquivo);
      
      // Criar URL para prévia da imagem
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setImagemPreview(e.target?.result as string);
      };
      fileReader.readAsDataURL(arquivo);
    }
  };
  
  // Função para lidar com a mudança de estilo
  const handleEstiloChange = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    setEstilo(evento.target.value);
  };
  
  // Simular envio de email com os dados
  interface EmailData {
    email: string;
    whatsapp: string;
    estilo: string;
    nomeImagem: string;
    tamanhoImagem: number;
    dataHora: string;
  }
  
  const enviarEmail = (dados: EmailData) => {
    console.log("Enviando email para dev.souzaedu@gmail.com com os dados:", dados);
    // Em um ambiente real, aqui haveria uma chamada para API de envio de email
  };
  
  // Função para transformar a foto
  const transformarFoto = () => {
    // Validações
    if (!imagem) {
      alert("Por favor, selecione uma imagem primeiro.");
      return;
    }
    
    if (!email) {
      alert("Por favor, informe seu email.");
      return;
    }
    
    if (!whatsapp) {
      alert("Por favor, informe seu número de WhatsApp.");
      return;
    }
    
    // Simular envio de email com as informações
    const dadosEnvio: EmailData = {
      email: email,
      whatsapp: whatsapp,
      estilo: estilo,
      nomeImagem: imagem.name,
      tamanhoImagem: imagem.size,
      dataHora: new Date().toISOString()
    };
    
    enviarEmail(dadosEnvio);
    
    // Navegar para a página de instruções
    router.push("/instrucoes");
  };
  
  return (
    <div className="relative min-h-screen flex flex-col items-center p-8">
      {/* Background com imagem, overlay e blur */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/bg_anime.jpg')" }}></div>
        <div className="absolute inset-0 backdrop-blur-md bg-white/70"></div>
      </div>
      
      <header className="my-8 z-10 relative">
        <h1 className="text-4xl font-bold text-center text-purple-800">Gerador de Foto Anime</h1>
        <p className="mt-2 text-center text-gray-600">Transforme suas fotos em diferentes estilos artísticos!</p>
      </header>

      <main className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg z-10 relative">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Sua Foto
          </label>
          <div className="flex items-center justify-center w-full">
            <label className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 border-gray-300 hover:bg-gray-100 ${imagemPreview ? 'border-purple-300 bg-purple-50' : ''}`}>
              {imagemPreview ? (
                <div className="relative w-full h-full">
                  <div className="w-full h-full p-2">
                    <Image 
                      src={imagemPreview} 
                      alt="Prévia da imagem"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium">Clique para trocar</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Clique para fazer upload</span>
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG ou JPEG (Max. 10MB)</p>
                </div>
              )}
              <input 
                id="dropzone-file" 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleImagemUpload}
              />
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Escolha o Estilo
          </label>
          <select 
            className="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            value={estilo}
            onChange={handleEstiloChange}
          >
            <option value="anime">Anime</option>
            <option value="ghibli">Studio Ghibli</option>
            <option value="disney">Disney</option>
            <option value="lego">Lego</option>
            <option value="sesame">Sesame Street</option>
            <option value="naruto">Naruto</option>
            <option value="art">Arte Digital</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Seu Email
          </label>
          <input 
            type="email" 
            className="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Seu WhatsApp
          </label>
          <input 
            type="tel" 
            className="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            placeholder="(00) 00000-0000"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
          />
        </div>

        <button
          type="button"
          className="w-full px-4 py-3 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium"
          onClick={transformarFoto}
        >
          Transformar Foto
        </button>
      </main>

      <footer className="mt-8 text-center text-gray-500 text-sm z-10 relative">
        <p>© 2024 Gerador de Foto Anime - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
