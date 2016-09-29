create database if not exists blog;
use blog;
create table article (
  id int NOT NULL AUTO_INCREMENT primary key,
  title varchar(100) null,
  body text null,
  author varchar(100) null
);
INSERT INTO `article` (`id`, `title`, `body`, `author`) VALUES ('', ' Getting Started with Bookshelf.js ', 'In the last three years we have seen a spike in JavaScript’s popularity. Over the years, there have been multiple attempts at taking the popular language to the server. The most prevailing of these attempts has been Node.js, which was presented to the community as a quick way of writing server applications. The selling point for Node was speed, both in terms of performance and in development time. With this kind of popularity the community grew and the project benefited from more contributors, resulting in high quality modules like Express.js.', ' Sibongakonke Nkosi');
