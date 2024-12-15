import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		debug: true,
		fallbackLng: "en",
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		resources: {
			en: {
				translation: {
					buttonTexts: {
						createButton: "Add shopping list",
						archiveButton: "Show archived",
						archiveButtonOff: "Hide archived",
						showFinished: "Show finished",
						showFinishedOff: "Hide finished",
						addItem: "Add item",
						addUserOwner: "Add user to shopping list",
						addUserMember: "View Members",
						addUser: "Add user",
						userAdded :"User added",
						addUserLong: "Add user",
						removeUser: "Remove user",
						leave:"Leave list",
						createShoppingList: "Create a shopping list",
						submit:"Submit",
						cancel:"Cancel"
					},
					titles: {
						mainPage: "Shopping Lists",
						itemsInList: "Items in list",
						detailPage: {
							items: "Items",
							quantity: "Quantity",
							itemName: "Item name",
							users: "Users",
							usersInList: "Users in this list",
							owner: "Owner",
							enterItemName: "Enter item name",
							enterItemQuantity:"Enter item quantity",
							youHaveLeft: "You have left the shopping list"
						},
					},
					placeholders:{
						nameInput:"Enter shopping list name"
					}
				},
			},
			cz: {
				translation: {
					buttonTexts: {
						createButton: "Přidat nákupní seznam",
						archiveButton: "Zobrazit archivované",
						archiveButtonOff: "Skrýt archivované",
						showFinished: "Zobrazit hotové",
						showFinishedOff: "Skrýt hotové",
						addItem: "Přidat položku",
						addUserOwner: "Přidat uživatele do seznamu",
						addUserMember: "Zobrazit uživatele",
						addUser: "Přidat",
						addUserLong: "Přidat uživatele",
						userAdded :"Přidán",
						removeUser: "Odebrat",
						leave:"Opustit seznam",
						createShoppingList: "Vytvoř nákupní seznam",
						submit:"Přidat",
						cancel:"Zrušit"
					},
					titles: {
						mainPage: "Nákupní seznamy",
						itemsInList: "Položky v seznamu",
						detailPage: {
							items: "Položky",
							quantity: "Množství",
							itemName: "Název",
							users: "Uživatelé",
							usersInList: "Členové seznamu",
							owner: "Vlastník",
							enterItemName: "Zadej název položky",
							enterItemQuantity:"Zadej množství položky",
							youHaveLeft: "Opouštíš seznam"
						},
					},
					placeholders:{
						nameInput:"Zadej název seznamu"
					}
				},
			},
		},
	});

export default i18n;
