import { QrCodePix } from 'qrcode-pix';

export class GeneratePix {
  async execute() {
    const qrCodePix = QrCodePix({
      version: '01',
      key: '48998203649', //or any PIX key
      name: 'Summertime Sale',
      city: 'SAO PAULO',
      transactionId: 'YOUR_TRANSACTION_ID', //max 25 characters
      message: 'Pagamento de compras na Summertime Sale',
      cep: '99999999',
      value: 0.10,
    });
    return await qrCodePix.base64();
  }
}