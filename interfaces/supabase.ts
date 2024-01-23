export interface UpsertRowArgs {
    tableName: string;
    record: Record<string, any>[];
    access_token: string;
    onConflict: string;
}

export interface UpdateRowArgs {
    tableName: string;
    record: Record<string, any>[];
    access_token: string;
    match: Record<string, any>;
}

export interface InsertRowArgs {
    tableName: string;
    record: Record<string, any>[];
    access_token: string;
}