"use client";

import { useRouter } from "next/navigation";

export default function Sucesso() {
  const router = useRouter();
  
  return (
    <div className="relative min-h-screen flex flex-col items-center p-8">
      {/* Background com imagem, overlay e blur */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/bg_anime.jpg')" }}></div>
        <div className="absolute inset-0 backdrop-blur-md bg-white/70"></div>
      </div>
      
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg my-12 text-center z-10 relative">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg 
            className="w-10 h-10 text-green-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Pagamento Confirmado!</h1>
        <p className="text-gray-600 mb-8">
          Sua transformação de foto está sendo processada. Em breve você receberá sua imagem por e-mail.
        </p>
        
        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-medium text-purple-800 mb-2">Detalhes do pedido</h2>
          <div className="flex justify-between mb-1 text-sm">
            <span className="text-gray-600">Transformação de foto</span>
            <span>R$ 19,90</span>
          </div>
          <div className="flex justify-between font-medium text-sm">
            <span>Total</span>
            <span>R$ 19,90</span>
          </div>
        </div>
        
        <button
          onClick={() => router.push("/")}
          className="w-full px-4 py-3 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium"
        >
          Voltar para o início
        </button>
      </div>
      
      <footer className="mt-auto text-center text-gray-500 text-sm pb-8 z-10 relative">
        <p>© 2024 Gerador de Foto Anime - Todos os direitos reservados</p>
        <p className="mt-1">Pagamentos processados com segurança pela AbacatePay</p>
      </footer>
    </div>
  );
} 