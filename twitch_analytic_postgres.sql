DROP TABLE IF EXISTS dashboard_view;
DROP TABLE IF EXISTS user_dashboard;

DROP TABLE IF EXISTS "user" ;
CREATE TABLE "user" (
	id_user SERIAL,
	username VARCHAR(45),
	password VARCHAR(100),
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

INSERT INTO dashboard (title) VALUES ('StreamerName');
INSERT INTO dashboard (title) VALUES ('GameName');
INSERT INTO dashboard (title) VALUES ('Minecraft');
INSERT INTO dashboard (title) VALUES ('League of Legends');
INSERT INTO dashboard (title) VALUES ('Skate 4');
INSERT INTO dashboard (title) VALUES ('Ninja');
INSERT INTO dashboard (title) VALUES ('Escape from Tarkov');
INSERT INTO dashboard (title) VALUES ('Call of Duty Modern Warfare');

INSERT INTO "view" (view_type,content_id) VALUES (1,3125543);
INSERT INTO "view" (view_type,content_id) VALUES (2,4512354);
INSERT INTO "view" (view_type,content_id) VALUES (2,4512354);
INSERT INTO "view" (view_type,content_id) VALUES (2,7512352);
INSERT INTO "view" (view_type,content_id) VALUES (2,9582657);
INSERT INTO "view" (view_type,content_id) VALUES (1,19571641);
INSERT INTO "view" (view_type,content_id) VALUES (2,8352554);
INSERT INTO "view" (view_type,content_id) VALUES (2,3522904);

INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (1, 1);
INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (1, 2);
INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (1, 3);
INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (1, 4);
INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (2, 2);
INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (3, 3);
INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (4, 4);
INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (5, 5);
INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (6, 6);
INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (7, 7);
INSERT INTO dashboard_view (id_dashboard,id_view) VALUES (8, 8);

INSERT INTO user_dashboard (id_user, id_dashboard) VALUES (2,1);
INSERT INTO user_dashboard (id_user, id_dashboard) VALUES (1,2);
INSERT INTO user_dashboard (id_user, id_dashboard) VALUES (1,3);
INSERT INTO user_dashboard (id_user, id_dashboard) VALUES (1,4);
INSERT INTO user_dashboard (id_user, id_dashboard) VALUES (3,5);
INSERT INTO user_dashboard (id_user, id_dashboard) VALUES (2,6);
INSERT INTO user_dashboard (id_user, id_dashboard) VALUES (3,7);
INSERT INTO user_dashboard (id_user, id_dashboard) VALUES (3,8);