export type CardCode = number | false;

// card stats data
export type CardDetail = Record<string, any> | false;


// card data (default data)
export type CardData = {
    title: string;
    name: string;
    search: string;
    type: string;
    image: string | '';
};

// card data list 
export type CardListMap = Record<number, CardData>;

