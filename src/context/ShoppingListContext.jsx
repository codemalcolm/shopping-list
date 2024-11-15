import React, { createContext, useState, useContext } from 'react';

// Create context
const ShoppingListContext = createContext();

// Create a provider component
export const ShoppingListProvider = ({ children }) => {
    const [shoppingList, setShoppingList] = useState([
        {
            id: "td01",
            name: "První úkolovník",
            state: "active",
            owner: "u1",
            memberList: ["u2", "u3"],
            itemList: [
                {
                    id: "2",
                    name: "Bananas",
                    quantity: 6,
                    isDone: false,
                },
            ],
            isDone: false,
            isArchived: false,
        },
        {
            id: "td02",
            name: "Druhý úkolovník",
            state: "archived",
            owner: "u2",
            memberList: ["u3"],
            itemList: [
                {
                    id: "3",
                    name: "Milk",
                    quantity: 1,
                    isDone: false,
                },
            ],
            isDone: true,
            isArchived: true,
        },
        // Add more mock lists as needed...
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

// Custom hook to use the ShoppingList context
export const useShoppingList = () => useContext(ShoppingListContext);
