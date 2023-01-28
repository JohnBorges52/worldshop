# Getting Started

1. Clone this Repo.
2. Install the dependecies using **_npm install_**.
3. Run the server using **_npm start_**.
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
5. Navigate the website.

## Requirements

This project is a Frontend Developer Hiring Challenge made by Chimoney in order to test the skill of candidates in developing a responsive Checkout experience for users.

The main task consisted in:

- Store the information in LocalStorage.
- Show notification when an item is added to the cart.
- Give the user the functions to add/remove and change the quantity of the items inside the cart.

Additional tasks:

- Use Chimoney API to use as data in order to build a product navigation page.
- Build full user experience such as Product List, Card List, Product Detail, and Dummy checkout page.

## Additional Features

In addition, I decided to make some user experience features that I judged beneficial to the project.

### Product Page:

!["Image Showing ProductPage"](https://github.com/JohnBorges52/Frontend-Developer-Chimoney/blob/master/public/resourses/githubImg/productPage.png)
!["Image Showing Expanded Item"](https://github.com/JohnBorges52/Frontend-Developer-Chimoney/blob/master/public/resourses/githubImg/expandedItem.png)

- I used the grid template in order to show items in columns and make it easier for the user to navigate through them.
- As the dummy data consists of 100 items, I decided to add Pagination, fixing a limit of 16 items per page, totaling 7 pages total.
- For the item container, I added a see more button to it, which expands the item, showing more information to the user.
- On the top Nav bar, it is possible to see the number of items that contain inside the cart without opening it.
- Added a blur and brightness effect to the product page when the user selects the cart component or expands an item.

<br/>

### Cart

!["Image Showing CartPage"](https://github.com/JohnBorges52/Frontend-Developer-Chimoney/blob/master/public/resourses/githubImg/cartPage.png)
!["Image Showing Dummy CheckoutPage"](https://github.com/JohnBorges52/Frontend-Developer-Chimoney/blob/master/public/resourses/githubImg/checkoutPage.png)
<br/>

- I added a section that shows the total financial amount of the items the user has already added to the cart.
- I Added a section that allowing users to delete all the items from the cart at once and redirecting the user back to the shopping page.
- Added a function that prevents the user from adding an item with zero amount. If a user decides to decrease the quantity to zero, an alarm pop-up will appear, asking them to either delete the item or cancel the operation. If the user clicks on delete, the specific item will be deleted. If the user clicks cancel, the item will automatically return to 1.

## Future Prospects

As a way to improve the project, I would like to implement tests such as Cypress in order to simulate user navigation through the website and potentially find errors.
Also, I would like to use the Redux library to use and manage states better and more efficiently.
