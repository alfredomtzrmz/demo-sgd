import http from '@/services/ApiService';
import { APIResponse } from '@/services/ApiService.types';
import { Document } from '@/services/DocumentService.types';

export default class DocumentService {
  /**
   * Retrieves documents from the server.
   *
   * @return {Promise<APIResponse<DocumentResponse>} The API response containing an array of documents.
   */
  static async getDocuments(
    page: number = 1,
    limit: number = 1,
    query: string = '',
  ): Promise<APIResponse<Document[]>> {
    return http.get(
      `/documents?limit=${limit}&page=${page}&filter[title]=${query}`,
    );
  }

  static async getDocument(id: number): Promise<APIResponse<Document>> {
    return http.get(`/documents/${id}`);
  }

  static async createDocument(
    document: Document,
  ): Promise<APIResponse<Document>> {
    return http.post('/documents', document);
  }

  static async updateDocument(
    document: Document,
    documentId: number,
  ): Promise<APIResponse<Document>> {
    return http.post(`/documents/${documentId}`, document);
  }

  static async deleteDocument(id: number): Promise<APIResponse<null>> {
    return http.delete(`/documents/${id}`);
  }
}
