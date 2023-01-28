# Getting Started

1.Clone this Repo.
2.Install the dependecies using npm install.
3.Run the server using npm start.
4.Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
5.Navigate the website.

## Requirements

This project is a Frontend Developer Hiring Challenge made by Chimoney in order to test the skill of candidates with developing a responsive Checkout experience to users.

The main task was consisted in:

- Store the information in LocalStorage.
- Show notification when an item is added to the cart.
- Give the user the functions to add/remove and change the quantity of the items inside the cart.

Additional tasks:

- Use Chimoney API to use as data in order to build a products navigation page.
- Build full user experience such as: Product List, Card List, Product Detail and Dummy checkout page.

## Additional Features

As an additional, I decided to make some user experience features that I judged beneficial to the project.

Product Page:

!["Image Showing ProductPage"]()
!["Image Showing Expanded Item"]()

- I used the grid template in order to show items in columns, and make it easier from the user to navigate through them.
- As the dummy data consists of 100 items, I decided to add Pagination fixing a limit of 16 items per page totaling 7 pages total.
- For the item container I added a see more button to it which expand the item, showing more information to the user.
- On the top Nav bar, it is possible to see the number of items that countains inside the cart without oppening it.

Cart

!["Image Showing CartPage"]()
!["Image Showing Dummy CheckoutPage"]()

- I added a section which shows the total financial amount of the items the user has already added to the cart.
- Added a section which allow users to delete all the items from the cart at once and redirect the user back to the shopping page.
- Added a function which prevents the user from adding an item with zero amount. If a user decides to decrease the quantity to zero, a alarm pop-up will appear asking them to either delete the item or cancel the opperation. If the user clicks on delete, the specific item is going to be deleted. If the user clicks cancel, the item will authomatically go back to 1.

## Future Prospects

As a way to improve the project I would like to implement tests such as Cypress in order to simulate user navigation through the website and pottentially finding errors.
Also I would like to use the Redux library so I could use and manage states better and more efficiantly.
