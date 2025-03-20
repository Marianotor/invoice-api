import { Client } from "../entities/Client";

export class ClientService {
  static async getAllClients(): Promise<Client[]> {
    return await Client.find();
  }

  static async getClientById(id: string): Promise<Client | null> {
    return await Client.findOneBy({ id });
  }

  static async createClient(name: string, email: string): Promise<Client> {
    const existingClient = await Client.findOneBy({ email });
    if (existingClient) {
      throw new Error("Client with this email already exists");
    }
    const client = new Client();
    client.name = name;
    client.email = email;
    await client.save();
    return client;
  }

  static async updateClient(
    id: string,
    updateData: Partial<Client>
  ): Promise<Client | null> {
    const client = await Client.findOneBy({ id });
    if (!client) return null;

    Object.assign(client, updateData);
    return await client.save();
  }

  static async deleteClient(id: string): Promise<boolean> {
    const client = await Client.findOneBy({ id });
    if (!client) return false;

    await client.softRemove();
    return true;
  }
}
