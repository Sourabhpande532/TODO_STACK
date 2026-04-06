// Example service file: leadsService.js
import { fetchJSON } from "./fetchJSON";

export const getLeads = () => fetchJSON("/leads");

export const addLead = (newLead) =>
  fetchJSON("/leads", { method: "POST", body: newLead });

export const updateLead = (id, updatedData) =>
  fetchJSON(`/leads/${id}`, { method: "PUT", body: updatedData });

export const deleteLead = (id) =>
  fetchJSON(`/leads/${id}`, { method: "DELETE" });
