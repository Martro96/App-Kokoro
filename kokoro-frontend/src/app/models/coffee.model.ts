export interface Coffee {
    id: number,
    name: string,
    origin: string,
    notes: string, 
    price: number,
    available: boolean,
    imageUrl?: string,
    quantity?: number
}
