use easytrack.db;

INSERT INTO department (id, name) VALUES (1, 'Lab');
INSERT INTO department (id, name) VALUES (5, 'Accounting');

INSERT INTO roles (id, role_title, salary, dept_id) VALUES (10, Manager, 200000, 25);
INSERT INTO roles (id, role_title, salary, dept_id) VALUES (35, CEO, 150000.25, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (20, Joe, Shmoe, 2, 5);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (500, Jane, Main, 6, 20);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (60, Doug, Slug, 8, 20);