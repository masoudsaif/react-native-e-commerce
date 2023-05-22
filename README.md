# CS571-2023-05-Extra-Project

# Extra Project

This project is tested on ios only!
The project is based on this [design](https://www.uplabs.com/posts/grocery-app-ios-mobile-ui-kits-food-delivery-app)

## Available Scripts

Please add the following values to the .env in the express-app

DB_URI=mongodb+srv://admin:a7oCH8DI5TmbWx7C@cluster.jmlrro8.mongodb.net/?retryWrites=true&w=majority
JWT_KEY=\_Qb4YFrSO_L_M8hQiyIC-CIBmad84arAchnS47pykSPwZWkQXZCkBivQLa7TwNTRWmUKaSPoXmSOLdjeDNMvxCim-SySHbLsjji_Bp9Mi05K_z_mnM9hUZhmnryGybe-sHHZAyjYHrysrrxpGJIwmc2ynYQYqjMXP_W8pAJH1oc
ACCESS_KEY=AKIATFB6LRKVETSVZWB4
SECRET_ACCESS_KEY=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
BUCKET_NAME=express-app-bucket

In the express-app directory, you can run:

### `npm install`

### `npm start`

In the ReactNativeApp directory, you can run:

### `npm install`

### `npm run pod`

### `npm run ios`

## Build an e-comerce system to satisfy the following conditions

- There are two types of users in the system, admin and customer.

1. Customers can do the following actions:

- Sign Up
- Sign In
- View list of products
- Add products to the cart
- Review/update the current products in the cart
- Place an order by using credit card or cash
- Check the status of the existing orders
- Return an order
- Add review for products

2. Admins can do the following actions:

- Sign In
- CRUD products
- View/Update orders
- View/disable a user
- Create an admin user

3. At the beginning, the system has an admin user
4. All passwords should be hashed
5. Use JWT for Authorization and Authentication
6. Only use the fundamental components with your own styles from React Native like: View, Text, Touchable\*, button, Flatlist/ScrollView, TextInput, KeyboardAvoidingView, Image, ImageBackground
7. If you want to have the navigation, please use React Native Navigation: https://reactnavigation.org/
8. If you want to host a web component, please use webview: https://github.com/react-native-webview/react-native-webview
9. Do not use any styling UI kits like React Native Element...
10. You can upload the images to AWS storage - S3

## Technologies

- Backend: NodeJS Express, MongoDB
- Frontend: React Native
- Payment method: Stripe or anything you know

### Database

#### User

```JavaScript
{
    _id: ObjectId,
    email: String,
    password: String,
    role: String, //customer or admin,
    time: String,
    disable: Boolean, //A disable user cannot login to system
}
```

### Product

```JavaScript
{
    _id: ObjectId,
    name: String,
    images: String,
    category: String,
    price: Number,
    review: {
        score: Number, //average of all stars
        feedbacks: [
            {
                _id: ObjectId
                stars: Number,//1, 2, 3, 4, 5
                comment: String
            }
        ]
    },
    time: String,
}
```

### Order

```JavaScript
{
    _id: ObjectId,
    userId: ObjectId,
    products: [
        {
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    total: Number, // sum of all (product.price * quantity)
    payment: String, //card or cash
    time: String,
    status: String, //ordered, delivered, or canceled
}
```
