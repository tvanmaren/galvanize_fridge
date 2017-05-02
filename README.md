# Fridge Face

 Fridge Face is a friendly inventory management system for communal refrigerators. The app enables community members to view fridge contents, filter food by categories, check expiration dates and receive announcements.

Fridge Face was built to be mobile friendly so it could constantly be near a fridge on a tablet.

Live at: https://fridge-face.herokuapp.com/

------

### Overview

First, you have to login.

For an admin account, try

#### USER: tm.vanmaren@gmail.com
#### PWD: 1234

For a non-admin account, use

#### USER: kind2karma@gmail.com
#### PWD: 1234

On the main page you see announcements looping. These announcements are created and maintained by administrators.

![announcements](img/announcements.png)



Items in the fridge are shown on the main page and displayed in a card format. Each card shows a picture of the food item, displays comments, the food category (Personal, Event, Community), expiration date and a delete button. The expiration date is green if the food is still good, yellow if it the item expires that day and red if the food item is expired.

![view the food](img/food-view.png)



When adding a food item to the fridge, you fill in several fields. The email field auto populates and filters with email addresses from the database. Then you can access your camera or upload a previously taken photo. Other fields that are required are category, expiration date and comments.

![Add-Food](img/add-food.png)



When in the admin view, you can see who has how many items of food in the fridge at that current time.

![admin view](img/Admin-Overview.png)

### Cassie's Demo Video

[![Fridge Face Video](https://img.youtube.com/vi/e-4Jj4QtjMY/0.jpg)](https://youtu.be/e-4Jj4QtjMY)
