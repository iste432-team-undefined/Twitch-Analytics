DROP TABLE IF EXISTS dashboard_view;
DROP TABLE IF EXISTS user_dashboard;

DROP TABLE IF EXISTS "user" ;
CREATE TABLE "user" (
	id_user SERIAL,
	username VARCHAR(45),
	password VARCHAR(50),
	salt VARCHAR(25),
	PRIMARY KEY(id_user)
);

DROP TABLE IF EXISTS dashboard;
CREATE TABLE dashboard (
	id_dashboard SERIAL,
	title VARCHAR(20),
	owner_id INT NOT NULL,
	PRIMARY KEY(id_dashboard),
	FOREIGN  KEY (owner_id) REFERENCES "user" (id_user)
);

DROP TABLE IF EXISTS "view";
CREATE TABLE "view" (
	id_view SERIAL,
	view_type SMALLINT,
	id_dashboard INT NOT NULL,
	content_id INT NOT NULL,
	PRIMARY KEY(id_view),
	FOREIGN KEY (id_dashboard) REFERENCES dashboard (id_dashboard)
);

CREATE TABLE dashboard_view (
	id_dashboard INT NOT NULL,
	id_view INT NOT NULL,
	PRIMARY KEY(id_dashboard, id_view),
	FOREIGN KEY (id_dashboard) REFERENCES dashboard (id_dashboard),
	FOREIGN KEY (id_view) REFERENCES "view" (id_view)
);

CREATE TABLE user_dashboard (
	id_user INT NOT NULL,
	id_dashboard INT NOT NULL,
	PRIMARY KEY (id_user, id_dashboard),
	FOREIGN KEY (id_user) REFERENCES "user" (id_user),
	FOREIGN KEY (id_dashboard) REFERENCES dashboard (id_dashboard)
);

INSERT INTO "user" (username,password,salt) VALUES ('test1','testpwd','salthere');
INSERT INTO "user" (username,password,salt) VALUES ('test2','estpw','alhere');
INSERT INTO "user" (username,password,salt) VALUES ('test3','ttpd','sthere');

INSERT INTO dashboard (title, owner_id) VALUES ('StreamerName', 2);
INSERT INTO dashboard (title, owner_id) VALUES ('GameName', 1);

INSERT INTO "view" (view_type,id_dashboard,content_id) VALUES (1,1,3125543);
INSERT INTO "view" (view_type,id_dashboard,content_id) VALUES (2,1,4512354);

INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (1, 1);
INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (2, 1);

INSERT INTO user_dashboard (id_user, id_dashboard) VALUES (1,1);
INSERT INTO user_dashboard (id_user, id_dashboard) VALUES (2,2);