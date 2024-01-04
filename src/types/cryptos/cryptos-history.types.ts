export interface ICryptosHistory {
    status: Status
    data: Data
}

// error | pending
type Status = 'success' | string

export type Data = {
    change: string
    history: HistoryList
}

type History = {
    price: string
    timestamp: number
}

type HistoryList = Array<History>
