/**
 * Módulo para integração com a API AbacatePay
 */

// As variáveis abaixo estão comentadas para evitar erro de lint "não utilizada"
// Em produção, descomentar e utilizar nos métodos reais
// const API_KEY = 'abc_dev_sMBJENHnAuDt6LcKSLxnP3CB';
// const BASE_URL = 'https://api.abacatepay.com/v1';

interface CriarPixQRCodeParams {
  valor: number;
  descricao: string;
  referencia: string;
}

interface PixQRCodeResponse {
  id: string;
  qrcode_url: string;
  qrcode_text: string;
  status: 'pendente' | 'pago' | 'expirado' | 'cancelado';
  valor: number;
}

interface CobrancaCartaoParams {
  valor: number;
  descricao: string;
  referencia: string;
  cartao: {
    numero: string;
    nome: string;
    validade: string;
    cvv: string;
  };
}

interface CobrancaCartaoResponse {
  id: string;
  status: 'aprovado' | 'recusado' | 'em_analise';
  valor: number;
  mensagem?: string;
}

/**
 * Cria um QRCode PIX para pagamento
 */
export async function criarPixQRCode(params: CriarPixQRCodeParams): Promise<PixQRCodeResponse> {
  try {
    // Em ambiente de produção, esta seria uma chamada real à API
    // const response = await fetch(`${BASE_URL}/pix/qrcode`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${API_KEY}`
    //   },
    //   body: JSON.stringify(params)
    // });
    
    // if (!response.ok) {
    //   throw new Error(`Erro ao criar QRCode PIX: ${response.status}`);
    // }
    
    // return await response.json();
    
    // Simulação de resposta para ambiente de desenvolvimento
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      id: `PIX_${Date.now()}`,
      qrcode_url: 'https://via.placeholder.com/200x200?text=PIX+QR+CODE',
      qrcode_text: '00020126580014BR.GOV.BCB.PIX0136a629532e-7693-4846-852d-1bbff817b5a8520400005303986540519.905802BR5909AbacatePay6008Sao Paulo62090505123456304B14A',
      status: 'pendente',
      valor: params.valor
    };
  } catch (error) {
    console.error('Erro ao criar QRCode PIX:', error);
    throw error;
  }
}

/**
 * Verifica o status de um pagamento PIX
 */
export async function verificarStatusPix(_pixId: string): Promise<{ status: 'pendente' | 'pago' | 'expirado' | 'cancelado' }> {
  try {
    // Em ambiente de produção, esta seria uma chamada real à API
    // const response = await fetch(`${BASE_URL}/pix/status/${pixId}`, {
    //   method: 'GET',
    //   headers: {
    //     'Authorization': `Bearer ${API_KEY}`
    //   }
    // });
    
    // if (!response.ok) {
    //   throw new Error(`Erro ao verificar status do PIX: ${response.status}`);
    // }
    
    // return await response.json();
    
    // Simulação de resposta para ambiente de desenvolvimento
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      status: Math.random() > 0.7 ? 'pago' : 'pendente'
    };
  } catch (error) {
    console.error('Erro ao verificar status do PIX:', error);
    throw error;
  }
}

/**
 * Processa pagamento com cartão de crédito
 */
export async function processarPagamentoCartao(params: CobrancaCartaoParams): Promise<CobrancaCartaoResponse> {
  try {
    // Em ambiente de produção, esta seria uma chamada real à API
    // const response = await fetch(`${BASE_URL}/cartao/cobranca`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${API_KEY}`
    //   },
    //   body: JSON.stringify(params)
    // });
    
    // if (!response.ok) {
    //   throw new Error(`Erro ao processar pagamento com cartão: ${response.status}`);
    // }
    
    // return await response.json();
    
    // Simulação de resposta para ambiente de desenvolvimento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aprovado = Math.random() > 0.2;
    
    return {
      id: `CARD_${Date.now()}`,
      status: aprovado ? 'aprovado' : 'recusado',
      valor: params.valor,
      mensagem: aprovado ? 'Pagamento aprovado' : 'Cartão recusado. Verifique os dados ou tente outro cartão.'
    };
  } catch (error) {
    console.error('Erro ao processar pagamento com cartão:', error);
    throw error;
  }
} 