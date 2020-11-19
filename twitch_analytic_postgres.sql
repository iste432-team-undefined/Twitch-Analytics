DROP TABLE IF EXISTS dashboard_view;
DROP TABLE IF EXISTS user_dashboard;

DROP TABLE IF EXISTS "user" ;
CREATE TABLE "user" (
	id_user SERIAL,
	username VARCHAR(45),
	password VARCHAR(50),
	PRIMARY KEY(id_user)
);

DROP TABLE IF EXISTS dashboard;
CREATE TABLE dashboard (
	id_dashboard SERIAL,
	title VARCHAR(45),
	PRIMARY KEY(id_dashboard)
);

DROP TABLE IF EXISTS "view";
CREATE TABLE "view" (
	id_view SERIAL,
	view_type SMALLINT,
	content_id INT NOT NULL,
	PRIMARY KEY(id_view)
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

INSERT INTO "user" (username,password) VALUES ('gamer_man1','testpwd');
INSERT INTO "user" (username,password) VALUES ('Xxx_gamer420_xxX','estpw');
INSERT INTO "user" (username,password) VALUES ('GgeZ','ttpd');

INSERT INTO dashboard (title) VALUES ('gamer_man1 Dashboard');
INSERT INTO dashboard (title) VALUES ('Xxx_gamer420_xxX Dashboard');
INSERT INTO dashboard (title) VALUES ('GgeZ Dashboard');

INSERT INTO "view" (view_type,content_id) VALUES (1,37402112);
INSERT INTO "view" (view_type,content_id) VALUES (2,491931);
INSERT INTO "view" (view_type,content_id) VALUES (1,19571641);
INSERT INTO "view" (view_type,content_id) VALUES (2,7512352);
INSERT INTO "view" (view_type,content_id) VALUES (1,146582633);
INSERT INTO "view" (view_type,content_id) VALUES (2,27471);
INSERT INTO "view" (view_type,content_id) VALUES (1,110690086);
INSERT INTO "view" (view_type,content_id) VALUES (2,516575);

INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (1, 1);
INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (2, 2);
INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (3, 3);
INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (1, 4);
INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (2, 5);
INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (3, 6);
INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (1, 7);
INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (2, 8);

INSERT INTO user_dashboard (id_user, id_dashboard) VALUES (1,1);
INSERT INTO user_dashboard (id_user, id_dashboard) VALUES (2,2);
INSERT INTO user_dashboard (id_user, id_dashboard) VALUES (3,3);