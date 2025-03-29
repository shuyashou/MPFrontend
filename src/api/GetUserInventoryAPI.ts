import ApiClient, { ApiResponse } from './ApiClient';
 
export async function GetUserInventory(): Promise<ApiResponse> {
    return await ApiClient.get("api/v1/ProductInventory");
}