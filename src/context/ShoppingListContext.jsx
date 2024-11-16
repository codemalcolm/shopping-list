import React, { createContext, useState, useContext } from 'react';

const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
    const [shoppingList, setShoppingList] = useState([
            {
                id: "td01",
                name: "První úkolovník",
                state: "active",
                owner: "u1",
                memberList: ["u2", "u3"],
                itemList:[
                    {
                        id: "2",
                        name: "Bananas",
                        quantity: 6,
                        isDone: false,
                    },
                ],
                isDone: false,
                isArchived:false
            },
            {
                id: "td02",
                name: "Druhý úkolovník",
                state: "archived",
                owner: "u2",
                memberList: ["u3"],
                itemList:[
                    {
                        id: "3",
                        name: "Milk",
                        quantity: 1,
                        isDone: false,
                    },
                ],
                isDone: true,
                isArchived:false
            },
            {
                id: "td03",
                name: "Třetí úkolovník",
                state: "active",
                owner: "u3",
                memberList: ["u1"],
                itemList:[
                    {
                        id: "5",
                        name: "Eggs",
                        quantity: 12,
                        isDone: false,
                    },
                    {
                        id: "4",
                        name: "Bread",
                        quantity: 2,
                        isDone: true,
                    },
                ],
                isDone: false,
                isArchived:false
            },
            {
                id: "td04",
                name: "čtvrtý úkolovník",
                state: "archived",
                owner: "u1",
                memberList: [],
                itemList:[
                    {
                        id: "1",
                        name: "Apples",
                        quantity: 5,
                        isDone: false,
                    },
                ],
                isDone: true,
                isArchived:true
            },
    ]);

    const userList = [
        { id: "u1", name: "vochomůrka" },
        { id: "u2", name: "křemílek" },
        { id: "u3", name: "rákosníček" },
    ];

    return (
        <ShoppingListContext.Provider value={{ shoppingList, setShoppingList, userList }}>
            {children}
        </ShoppingListContext.Provider>
    );
};

export const useShoppingList = () => useContext(ShoppingListContext);
