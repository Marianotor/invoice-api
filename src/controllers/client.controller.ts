import { Request, Response } from "express";
import { ClientService } from "../services/client.service";

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await ClientService.getAllClients();
    return res.json(clients);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching clients" });
  }
};

export const getClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await ClientService.getClientById(id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    return res.json(client);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching client" });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const client = await ClientService.createClient(name, email);
    return res.status(201).json(client);
  } catch (error) {
    return res
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : "Error creating client",
      });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedClient = await ClientService.updateClient(id, req.body);
    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    return res.status(200).json(updatedClient);
  } catch (error) {
    return res.status(500).json({ message: "Error updating client" });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await ClientService.deleteClient(id);
    if (!deleted) return res.status(404).json({ message: "Client not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Error deleting Client" });
  }
};
