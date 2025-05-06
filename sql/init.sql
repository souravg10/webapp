CREATE TABLE IF NOT EXISTS answers (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    option VARCHAR(255) NOT NULL,
    correct BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    option1 varchar(255) NOT NULL,
    option2 varchar(255) NOT NULL,
    option3 varchar(255) NOT NULL,
    option4 varchar(255) NOT NULL,
    answer int NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO questions (question, option1, option2, option3, option4, answer)
VALUES
('What is the capital of France?', 'Berlin', 'Madrid', 'Paris', 'Rome', 2);

INSERT INTO questions (question, option1, option2, option3, option4, answer)
VALUES
('Which planet is known as the Red Planet?', 'Earth', 'Mars', 'Jupiter', 'Venus', 1);

INSERT INTO questions (question, option1, option2, option3, option4, answer)
VALUES
('What is the largest mammal?', 'Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus', 1);

INSERT INTO questions (question, option1, option2, option3, option4, answer)
VALUES
('Who wrote "Romeo and Juliet"?', 'Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen', 1);

INSERT INTO questions (question, option1, option2, option3, option4, answer)
VALUES
('What is the boiling point of water at sea level?', '90°C', '100°C', '110°C', '120°C', 1);

INSERT INTO questions (question, option1, option2, option3, option4, answer)
VALUES
('What is the smallest prime number?', '0', '1', '2', '3', 2);

INSERT INTO questions (question, option1, option2, option3, option4, answer)
VALUES
('Which gas do plants absorb during photosynthesis?', 'Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen', 1);

INSERT INTO questions (question, option1, option2, option3, option4, answer)
VALUES
('Who painted the Mona Lisa?', 'Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet', 2);

INSERT INTO questions (question, option1, option2, option3, option4, answer)
VALUES
('What is the chemical symbol for water?', 'H2O', 'O2', 'CO2', 'HO2', 0);

INSERT INTO questions (question, option1, option2, option3, option4, answer)
VALUES
('Which country is known as the Land of the Rising Sun?', 'China', 'Japan', 'South Korea', 'Thailand', 1);

INSERT INTO questions (question, option1, option2, option3, option4, answer)
VALUES
('What is the square root of 64?', '6', '7', '8', '9', 2);

INSERT INTO questions (question, option1, option2, option3, option4, answer)
VALUES
('Which element has the atomic number 1?', 'Oxygen', 'Hydrogen', 'Helium', 'Carbon', 1);

INSERT INTO questions (question, option1, option2, option3, option4, answer)
VALUES
('What is the capital of Australia?', 'Sydney', 'Melbourne', 'Canberra', 'Brisbane', 2);

INSERT INTO questions (question, option1, option2, option3, option4, answer)
VALUES
('Who discovered gravity?', 'Albert Einstein', 'Isaac Newton', 'Galileo Galilei', 'Nikola Tesla', 1);

INSERT INTO questions (question, option1, option2, option3, option4, answer)
VALUES
('What is the largest planet in our solar system?', 'Earth', 'Mars', 'Jupiter', 'Saturn', 2);