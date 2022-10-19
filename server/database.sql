CREATE DATABASE FoodMediaApp;

CREATE TABLE users(
    IdUser SERIAL PRIMARY KEY,
    phone VARCHAR(255),
    passwordUser VARCHAR(255),
    isGluten BOOLEAN,
    isVegan BOOLEAN,
    isVegetarian BOOLEAN,
    isNutAllergy BOOLEAN,
    isSeafood BOOLEAN,
    isLowsugar BOOLEAN,
    isKosher BOOLEAN
);
CREATE TABLE imagefiles(
    id SERIAL NOT NULL PRIMARY KEY,
    fileNameImage TEXT NOT NULL,
    filepath TEXT NOT NULL,
    mimetype TEXT NOT NULL,
    size BIGINT NOT NULL
);
/*DROP AND DO AGAIN*/
CREATE TABLE Restaruants(
    id SERIAL NOT NULL PRIMARY KEY,
    Restarunt VARCHAR(255) NOT NULL,
    Info VARCHAR(255) NOT NULL,
    Priceshipment VARCHAR(255) NOT NULL,
    Timeshipment VARCHAR(255) NOT NULL,
    tag VARCHAR(255) NOT NULL,
    Restarunt_image int UNIQUE ,
    CONSTRAINT idImage FOREIGN KEY (Restarunt_image) REFERENCES imagefiles (id),
    AddressRestaruant VARCHAR(255)
);

ALTER TABLE Restaruants
ADD AddressRestaruant VARCHAR(255);


ALTER TABLE Restaruants
DROP COLUMN Address;


CREATE TABLE Products(
    ProductId SERIAL PRIMARY KEY,
    ProductName VARCHAR(255) NOT NULL,
    Price SERIAL NOT NULL,
    Quantity NUMERIC NOT NULL,
    Total NUMERIC NOT NULL,
    isGluten BOOLEAN,
    isVegan BOOLEAN,
    isVegetarian BOOLEAN,
    isNutAllergy BOOLEAN,
    isSeafood BOOLEAN,
    isLowsugar BOOLEAN,
    isKosher BOOLEAN,
    RestaruntProduct int,
    FOREIGN KEY (RestaruntProduct) REFERENCES Restaruants (id) ON DELETE CASCADE
); 


CREATE TABLE Orders(
    orderId SERIAL PRIMARY KEY,
    IdUser int,
    FOREIGN KEY (IdUser) REFERENCES users (IdUser) ON DELETE CASCADE,
    creditCardID VARCHAR(255) NOT NULL,
    OrderDate DATE NOT NULL,
    TOTAL SERIAL NOT NULL,
    StatusOrder VARCHAR(255) NOT NULL,
    AddressUser VARCHAR(255) NOT NULL,
    RestaruntId int,
    FOREIGN KEY (RestaruntId) REFERENCES Restaruants (id) ON DELETE CASCADE
);

CREATE TABLE OrdersDetails(
    orderId int,
    FOREIGN KEY (orderId) REFERENCES Orders(orderId) ON DELETE CASCADE,
    ProductId int,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId) ON DELETE CASCADE,
    Quantity NUMERIC NOT NULL,
    Price SERIAL NOT NULL,
    TOTAL SERIAL NOT NULL
);



INSERT INTO users (phone,passwordUser,isGluten,isVegan,isVegetarian,isNutAllergy,isSeafood,isLowsugar,isKosher) VALUES ('+972525299433','Zaguri9910!',FALSE,FALSE,FALSE,FALSE,FALSE,FALSE,TRUE);
INSERT INTO Restaruants (Restarunt,Info,Priceshipment,Timeshipment,tag) VALUES ('McDonlads', 'chips and cool drink','10','20-25','burger');
INSERT INTO Restaruants (Restarunt,Info,Priceshipment,Timeshipment,tag,AddressRestaruant) VALUES ('Golda', 'Ice Cream, Drinks','15','20-30','burger','Ramat Gan');
INSERT INTO Products(Price,ProductName,Quantity,Total,isGluten,isVegan,isVegetarian,isNutAllergy,isSeafood,isLowsugar,isKosher) VALUES (50.3,'Double Burger',2,100.6,FALSE,FALSE,FALSE,FALSE,FALSE,FALSE,TRUE);
INSERT INTO Products(Price,ProductName,Quantity,Total,isGluten,isVegan,isVegetarian,isNutAllergy,isSeafood,isLowsugar,isKosher) VALUES (10.3,'Ice Cream',1,20.6,FALSE,FALSE,FALSE,FALSE,FALSE,FALSE,TRUE);

INSERT INTO Orders(creditCardID,OrderDate,TOTAL,StatusOrder,AddressUser) VALUES ('123685859858','12-12-2022',200.5,'DONE','Rival 14 Rishon Lezion');


INSERT INTO OrdersDetails(Quantity,Price,TOTAL) VALUES (5,20,100);

INSERT INTO OrdersDetails(orderId,Quantity,Price,TOTAL) VALUES (1,5,20,100);

UPDATE Restaruants SET Restarunt_image = 1 WHERE Restarunt = 'McDonlads';
UPDATE Restaruants SET Restarunt_image = 2 WHERE Restarunt = 'Burger King';
UPDATE Restaruants SET Restarunt_image = 3 WHERE Restarunt = 'Golda';
UPDATE Restaruants SET Restarunt_image = 4 WHERE Restarunt = 'McDonlads';

UPDATE Restaruants SET AddressRestaruant = 'Rishon Lezion' WHERE id = 1;
UPDATE Restaruants SET AddressRestaruant = 'Tel AViv' WHERE Restarunt = 'MacDonlads';
UPDATE Restaruants SET AddressRestaruant = 'Rishon Lezion' WHERE Restarunt = 'McDonlads';


UPDATE Products SET RestaruntProduct = 1 WHERE ProductName = 'Double Burger';
UPDATE Products SET RestaruntProduct = 1 WHERE ProductName = 'Ice Cream';

UPDATE Orders SET IdUser = 1 WHERE orderId = 2;
UPDATE Orders SET RestaruntId = 2 WHERE orderId = 2;


UPDATE OrdersDetails SET ProductId = 1 WHERE orderId = 2;

