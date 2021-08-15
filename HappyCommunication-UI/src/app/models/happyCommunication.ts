export class happyCommunication {
    private _Name!: string;
    public get ProductName(): string {
        return this._Name;
    }
    public set Name(value: string) {
        this._Name = value;
    }

    private _Id!: number;
    public get Id(): number {
        return this._Id;
    }

    public set Id(value: number) {
        this._Id = value;
    }

    private _Price!: number;
    public get Price(): number {
        return this._Price;
    }

    public set Price(value: number) {
        this._Price = value;
    }

    private _ImagePath!: string;
    public get ImagePath(): string {
        return this._ImagePath;
    }
    public set ImagePath(value: string) {
        this._ImagePath = value;
    }
}