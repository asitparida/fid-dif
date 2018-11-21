// tslint:disable
export const SampleFiles = [
    {
        'id': 0, 'leftImg': 'assets/bunbun/lo-fi/IMG_1130.JPG', 'rightImg': 'assets/bunbun/hi-fi/Bun Bun Landing.png', 'stateName': 'LANDING',
        'leftMarkers': [{ 'id': '1', 'top': 63, 'left': 41, 'width': 20.5, 'height': 13, 'targetState': 'DETAILS_LIST' }],
        'rightMarkers': [{ 'id': '1', 'top': 53, 'right': 59.52, 'width': 19, 'height': 14, 'targetState': 'DETAILS_LIST' }]
    }, {
        'id': 1, 'leftImg': 'assets/bunbun/lo-fi/IMG_1131.JPG', 'rightImg': 'assets/bunbun/hi-fi/Bun Bun Item List.png', 'stateName': 'DETAILS_LIST',
        'leftMarkers': [{ 'id': '1', 'top': 90, 'left': 290, 'width': 200, 'height': 200, 'targetState': 'ITEM_DETAILS_OVERLAY_PAGE' }],
        'rightMarkers': [{ 'id': '1', 'top': 100, 'right': 300, 'width': 200, 'height': 185, 'targetState': 'ITEM_DETAILS_OVERLAY_PAGE' }]
    }, {
        'id': 2, 'leftImg': 'assets/bunbun/lo-fi/IMG_1132.JPG', 'rightImg': 'assets/bunbun/hi-fi/Bun Bun Item Details.png', 'stateName': 'ITEM_DETAILS_OVERLAY_PAGE',
        'leftMarkers': [{ 'id': '1', 'top': 310, 'left': 400, 'width': 200, 'height': 70, 'targetState': 'ITEM_DETAILS_GLAZE_OPEN_PAGE' }],
        'rightMarkers': [{ 'id': '1', 'top': 360, 'right': 230, 'width': 140, 'height': 55, 'targetState': 'ITEM_DETAILS_GLAZE_OPEN_PAGE' }]
    }, {
        'id': 3, 'leftImg': 'assets/bunbun/lo-fi/IMG_1133.JPG', 'rightImg': 'assets/bunbun/hi-fi/Bun Bun Item Details – Pane Open for Glaze.png', 'stateName': 'ITEM_DETAILS_GLAZE_OPEN_PAGE',
        'leftMarkers': [{ 'id': '1', 'top': 475, 'left': 400, 'width': 200, 'height': 70, 'targetState': 'ITEM_DETAILS_GLAZE_UNITS_FILLED_PAGE' }],
        'rightMarkers': [{ 'id': '1', 'top': 360, 'right': 230, 'width': 140, 'height': 55, 'targetState': 'ITEM_DETAILS_GLAZE_UNITS_FILLED_PAGE' }]
    }, {
        'id': 4, 'leftImg': 'assets/bunbun/lo-fi/IMG_1134.JPG', 'rightImg': 'assets/bunbun/hi-fi/Bun Bun Item Details – Filled.png', 'stateName': 'ITEM_DETAILS_GLAZE_UNITS_FILLED_PAGE',
        'leftMarkers': [{ 'id': '1', 'top': 450, 'left': 410, 'width': 110, 'height': 70, 'targetState': 'CART_PAGE' }],
        'rightMarkers': [{ 'id': '1', 'top': 420, 'right': 262, 'width': 110, 'height': 48, 'targetState': 'CART_PAGE' }]
    }, {
        'id': 5, 'leftImg': 'assets/bunbun/lo-fi/IMG_1140.JPG', 'rightImg': 'assets/bunbun/hi-fi/Bun Bun Item Details – Cart Open Step 1.png', 'stateName': 'CART_PAGE',
        'leftMarkers': [{ 'id': '1', 'top': 470, 'left': 540, 'width': 140, 'height': 70, 'targetState': 'CART_DELIVERY_PAGE' }, { 'id': '1', 'top': 470, 'left': 130, 'width': 140, 'height': 70, 'targetState': 'DETAILS_LIST' }],
        'rightMarkers': [{ 'id': '1', 'top': 430, 'right': 110, 'width': 100, 'height': 50, 'targetState': 'CART_DELIVERY_PAGE' }, { 'id': '1', 'top': 430, 'right': 590, 'width': 100, 'height': 50, 'targetState': 'DETAILS_LIST' }]
    }, {
        'id': 6, 'leftImg': 'assets/bunbun/lo-fi/IMG_1141.JPG', 'rightImg': 'assets/bunbun/hi-fi/Bun Bun Item Details – Cart Open Step 2.png', 'stateName': 'CART_DELIVERY_PAGE',
        'leftMarkers': [{ 'id': '1', 'top': 450, 'left': 540, 'width': 140, 'height': 70, 'targetState': 'CART_PAYMENT_PAGE' }],
        'rightMarkers': [{ 'id': '1', 'top': 430, 'right': 110, 'width': 100, 'height': 50, 'targetState': 'CART_PAYMENT_PAGE' }, { 'id': '1', 'top': 430, 'right': 590, 'width': 100, 'height': 50, 'targetState': 'DETAILS_LIST' }]
    }, {
        'id': 7, 'leftImg': 'assets/bunbun/lo-fi/IMG_1142.JPG', 'rightImg': 'assets/bunbun/hi-fi/Bun Bun Item Details – Cart Open Step 3.png', 'stateName': 'CART_PAYMENT_PAGE',
        'leftMarkers': [{ 'id': '1', 'top': 470, 'left': 540, 'width': 140, 'height': 70, 'targetState': 'ORDER_CONFIRMATION_PAGE' }],
        'rightMarkers': [{ 'id': '1', 'top': 430, 'right': 110, 'width': 100, 'height': 50, 'targetState': 'ORDER_CONFIRMATION_PAGE' }, { 'id': '1', 'top': 430, 'right': 590, 'width': 100, 'height': 50, 'targetState': 'CART_DELIVERY_PAGE' }]
    }, {
        'id': 8, 'leftImg': 'assets/bunbun/lo-fi/IMG_1143.JPG', 'rightImg': 'assets/bunbun/hi-fi/Bun Bun - Order Complete.png', 'stateName': 'ORDER_CONFIRMATION_PAGE',
        'leftMarkers': [{ 'id': '1', 'top': 410, 'left': 310, 'width': 160, 'height': 60, 'targetState': 'LANDING' }],
        'rightMarkers': [{ 'id': '1', 'top': 365, 'right': 344, 'width': 110, 'height': 55, 'targetState': 'LANDING' }]
    }
];
