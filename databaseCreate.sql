Database named weekend_to_do

CREATE TABLE tasks(
  id SERIAL PRIMARY KEY,
  task VARCHAR(140),
  Status BOOLEAN
);
-- test item
INSERT INTO tasks(task, Status) VALUES ('Make a List app.', false);
