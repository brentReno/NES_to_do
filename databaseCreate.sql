CREATE TABLE tasks(
  id SERIAL PRIMARY KEY,
  task VARCHAR(140),
  Status BOOLEAN
);
-- test item
INSERT INTO tasks(task, Status) VALUES ('Make a List app.', false);

UPDATE syntax_practice SET account_balance =10.00 WHERE account_balance = 0 AND transactions_attempted = 0;
