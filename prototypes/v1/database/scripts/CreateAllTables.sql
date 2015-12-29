-- child of Avialibility and car and payment
IF OBJECT_ID('Booking')
IS NOT NULL DROP TABLE Booking;
IF OBJECT_ID('Payment')
IS NOT NULL DROP TABLE Payment;
-- child of SpotUser
IF OBJECT_ID('SpotAvailibility')
IS NOT NULL DROP TABLE SpotAvailibility;
-- child of AppUser
IF OBJECT_ID('SpotUser')
IS NOT NULL DROP TABLE SpotUser;
-- child of AppUser
IF OBJECT_ID('CarUser')
IS NOT NULL DROP TABLE CarUser;
-- parent table
IF OBJECT_ID('AppUser')
IS NOT NULL DROP TABLE AppUser;




CREATE TABLE AppUser (
	userID			INTEGER PRIMARY KEY IDENTITY(1000, 1),
	userName		VARCHAR(50) NOT NULL,
	passWord		VARCHAR(50) NOT NULL,
	firstName		VARCHAR(50) NOT NULL,
	lastName		VARCHAR(50) NOT NULL,
	phoneNumber		VARCHAR(50) NOT NULL,
	emailAddress	VARCHAR(100) NOT NULL,
	birthDate		DATE NOT NULL,
	paymentMethod	VARCHAR(50) NULL			 
);



CREATE TABLE SpotUser (
	spotID			INTEGER PRIMARY KEY IDENTITY(1000, 1),
	userID			INTEGER,
	spotType		VARCHAR(50) NOT NULL,
	country			VARCHAR(50) NOT NULL,
	province		VARCHAR(50) NOT NULL,
	streetAddress	VARCHAR(255) NOT NULL,
	postalCode		VARCHAR(50) NOT NULL,
	details			VARCHAR(500) NULL,
	
	FOREIGN KEY(userID) REFERENCES AppUser(userID)					
);



CREATE TABLE CarUser (
	carID			INTEGER PRIMARY KEY IDENTITY(1000, 1),
	userID			INTEGER,
	plateNumber		VARCHAR(50) NOT NULL,
	brand			VARCHAR(50) NULL,
	model			VARCHAR(50) NULL	

	FOREIGN KEY(userID) REFERENCES AppUser(userID)	
);



CREATE TABLE SpotAvailibility (
	spotID			INTEGER,
	dateAvailable	date,
	startTime		TIME,
	endTime			TIME,
	hourlyRate		DECIMAL(10,2),
	minBooking		DECIMAL(10,2)	
	
	FOREIGN KEY(spotID) REFERENCES SpotUser(spotID),
	-- PRIMARY KEY(dateAvailable, spotID),
	PRIMARY KEY(spotID, dateAvailable, startTime),			
			
)

CREATE TABLE Payment (
	paymentID		INTEGER PRIMARY KEY IDENTITY(1000, 1),
	paymentMethod	VARCHAR(50) NULL,
	paid			CHAR(1) NOT NULL
		
)

CREATE TABLE Booking (
	spotID			INTEGER,
	dateAvailable	date,
	startTime		TIME,
	endTime			TIME,
	hourlyRate		DECIMAL(10,2),
	paymentID		INTEGER FOREIGN KEY REFERENCES Payment(paymentID),
	carID			INTEGER FOREIGN KEY REFERENCES CarUser(carID),

	FOREIGN KEY (spotID, dateAvailable, startTime) REFERENCES SpotAvailibility(spotID, dateAvailable, startTime),	
	PRIMARY KEY (spotID, dateAvailable, startTime, carID)
)
