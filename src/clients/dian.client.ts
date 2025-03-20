import { Invoice } from "../entities/Invoice";

export class DianClient {
  private static callCount = 0;

  static async sendInvoice(
    invoice: Invoice
  ): Promise<{ data: string; invoiceId: string }> {
    this.callCount++;

    // Cada 3 peticiones se simula un fallo.
    if (this.callCount % 3 === 0) {
      throw new Error("Simulated DIAN service failure");
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: "DIAN response success", invoiceId: invoice.id });
      }, 100); // Retardo de 100 ms para simular latencia
    });
  }
}
