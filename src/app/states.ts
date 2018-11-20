export const BunBunStates = [
    {
        state: 'LANDING',
        leftPage: {
            id: '1',
            src: 'assets/bunbun/lo-fi/IMG_1130.JPG',
            markers: [
                {
                    id: '1',
                    top: 63,
                    left: 41,
                    width: 20.5,
                    height: 13,
                    targetState: 'DETAILS_LIST'
                }
            ]
        },
        rightPage: {
            id: '2',
            src: 'assets/bunbun/hi-fi/Bun Bun Landing.png',
            markers: [
                {
                    id: '1',
                    top: 53,
                    right: 59.52,
                    width: 19,
                    height: 14,
                    targetState: 'DETAILS_LIST'
                }
            ]
        }
    },
    {
        state: 'DETAILS_LIST',
        leftPage: {
            id: '1',
            src: 'assets/bunbun/lo-fi/IMG_1131.JPG',
            markers: [
                {
                    id: '1',
                    top: 90,
                    left: 290,
                    width: 200,
                    height: 200,
                    targetState: 'ITEM_DETAILS_OVERLAY_PAGE'
                }
            ]
        },
        rightPage: {
            id: '2',
            src: 'assets/bunbun/hi-fi/Bun Bun Item List.png',
            markers: [
                {
                    id: '1',
                    top: 100,
                    right: 300,
                    width: 200,
                    height: 185,
                    targetState: 'ITEM_DETAILS_OVERLAY_PAGE'
                }
            ]
        }
    },
    {
        state: 'ITEM_DETAILS_OVERLAY_PAGE',
        leftPage: {
            id: '1',
            src: 'assets/bunbun/lo-fi/IMG_1132.JPG',
            markers: [
                {
                    id: '1',
                    top: 310,
                    left: 400,
                    width: 200,
                    height: 70,
                    targetState: 'ITEM_DETAILS_GLAZE_OPEN_PAGE'
                }
            ]
        },
        rightPage: {
            id: '2',
            src: 'assets/bunbun/hi-fi/Bun Bun Item Details.png',
            markers: [
                {
                    id: '1',
                    top: 360,
                    right: 230,
                    width: 140,
                    height: 55,
                    targetState: 'ITEM_DETAILS_GLAZE_OPEN_PAGE'
                }
            ]
        }
    },
    {
        state: 'ITEM_DETAILS_GLAZE_OPEN_PAGE',
        leftPage: {
            id: '1',
            src: 'assets/bunbun/lo-fi/IMG_1133.JPG',
            markers: [
                {
                    id: '1',
                    top: 475,
                    left: 400,
                    width: 200,
                    height: 70,
                    targetState: 'ITEM_DETAILS_GLAZE_UNITS_FILLED_PAGE'
                }
            ]
        },
        rightPage: {
            id: '2',
            src: 'assets/bunbun/hi-fi/Bun Bun Item Details – Pane Open for Glaze.png',
            markers: [
                {
                    id: '1',
                    top: 360,
                    right: 230,
                    width: 140,
                    height: 55,
                    targetState: 'ITEM_DETAILS_GLAZE_UNITS_FILLED_PAGE'
                }
            ]
        }
    },
    {
        state: 'ITEM_DETAILS_GLAZE_UNITS_FILLED_PAGE',
        leftPage: {
            id: '1',
            src: 'assets/bunbun/lo-fi/IMG_1134.JPG',
            markers: [
                {
                    id: '1',
                    top: 450,
                    left: 410,
                    width: 110,
                    height: 70,
                    targetState: 'CART_PAGE'
                }
            ]
        },
        rightPage: {
            id: '2',
            src: 'assets/bunbun/hi-fi/Bun Bun Item Details – Filled.png',
            markers: [
                {
                    id: '1',
                    top: 420,
                    right: 262,
                    width: 110,
                    height: 48,
                    targetState: 'CART_PAGE'
                }
            ]
        }
    },
    {
        state: 'CART_PAGE',
        leftPage: {
            id: '1',
            src: 'assets/bunbun/lo-fi/IMG_1140.JPG',
            markers: [
                {
                    id: '1',
                    top: 470,
                    left: 540,
                    width: 140,
                    height: 70,
                    targetState: 'CART_DELIVERY_PAGE'
                },
                {
                    id: '1',
                    top: 470,
                    left: 130,
                    width: 140,
                    height: 70,
                    targetState: 'DETAILS_LIST'
                }
            ]
        },
        rightPage: {
            id: '2',
            src: 'assets/bunbun/hi-fi/Bun Bun Item Details – Cart Open Step 1.png',
            markers: [
                {
                    id: '1',
                    top: 430,
                    right: 110,
                    width: 100,
                    height: 50,
                    targetState: 'CART_DELIVERY_PAGE'
                },
                {
                    id: '1',
                    top: 430,
                    right: 590,
                    width: 100,
                    height: 50,
                    targetState: 'DETAILS_LIST'
                }
            ]
        }
    },
    {
        state: 'CART_DELIVERY_PAGE',
        leftPage: {
            id: '1',
            src: 'assets/bunbun/lo-fi/IMG_1141.JPG',
            markers: [
                {
                    id: '1',
                    top: 450,
                    left: 540,
                    width: 140,
                    height: 70,
                    targetState: 'CART_PAYMENT_PAGE'
                }
            ]
        },
        rightPage: {
            id: '2',
            src: 'assets/bunbun/hi-fi/Bun Bun Item Details – Cart Open Step 2.png',
            markers: [
                {
                    id: '1',
                    top: 430,
                    right: 110,
                    width: 100,
                    height: 50,
                    targetState: 'CART_PAYMENT_PAGE'
                },
                {
                    id: '1',
                    top: 430,
                    right: 590,
                    width: 100,
                    height: 50,
                    targetState: 'DETAILS_LIST'
                }
            ]
        }
    },
    {
        state: 'CART_PAYMENT_PAGE',
        leftPage: {
            id: '1',
            src: 'assets/bunbun/lo-fi/IMG_1142.JPG',
            markers: [
                {
                    id: '1',
                    top: 470,
                    left: 540,
                    width: 140,
                    height: 70,
                    targetState: 'ORDER_CONFIRMATION_PAGE'
                }
            ]
        },
        rightPage: {
            id: '2',
            src: 'assets/bunbun/hi-fi/Bun Bun Item Details – Cart Open Step 3.png',
            markers: [
                {
                    id: '1',
                    top: 430,
                    right: 110,
                    width: 100,
                    height: 50,
                    targetState: 'ORDER_CONFIRMATION_PAGE'
                },
                {
                    id: '1',
                    top: 430,
                    right: 590,
                    width: 100,
                    height: 50,
                    targetState: 'CART_DELIVERY_PAGE'
                }
            ]
        }
    },
    {
        state: 'ORDER_CONFIRMATION_PAGE',
        leftPage: {
            id: '1',
            src: 'assets/bunbun/lo-fi/IMG_1143.JPG',
            markers: [
                {
                    id: '1',
                    top: 410,
                    left: 310,
                    width: 160,
                    height: 60,
                    targetState: 'LANDING'
                }
            ]
        },
        rightPage: {
            id: '2',
            src: 'assets/bunbun/hi-fi/Bun Bun - Order Complete.png',
            markers: [
                {
                    id: '1',
                    top: 365,
                    right: 344,
                    width: 110,
                    height: 55,
                    targetState: 'LANDING'
                }
            ]
        }
    }
];
