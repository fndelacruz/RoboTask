# Schema Information

## tasks
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
title         | string    | not null
description   | text      | not null
location      | string    | not null
date_start    | datetime  | not null
date_end      | datetime  | not null
finish_date   | datetime  | default: null (will also be used to check if task is finished)
creator_id    | integer   | not null, foreign key (references users), indexed
worker_id     | integer   | not null, foreign key (references users), indexed

## tasktypes
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
description      | string    | not null
tasktypable_id   | integer   | not null, foreign key (references users(workers) or tasks), indexed
tasktypable_type | string    | not null
payrate          | integer   | not null (only used if tasktypable_type is  users, otherwise is null)

## qualifications
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
description       | string    | not null
qualifiable_id    | integer   | not null, foreign key (references users(workers) or tasks), indexed
qualifiable_type  | integer   | not null
good_review_count | integer   | not null, default: 0 (only used if qualifiable_type is users, otherwise is null)
bad_review_count  | integer   | not null, default: 0 (only used if qualifiable_type is users, otherwise is null)

## taskreviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
creator_id  | integer   | not null, foreign key (references users), indexed
worker_id   | integer   | not null, foreign key (references users), indexed
task_id     | integer   | not null, foreign key (references tasks), indexed
is_positive | boolean   | not null
description | text      | not null

## notifications
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
sender_id       | integer   | not null, foreign key (references users), indexed
receiver_id     | integer   | not null, foreign key (references users), indexed
date            | datetime  | not null
message         | text      | not null
sender_read     | boolean   | not null, default: false
sender_hidden   | boolean   | not null, default: false
sender_del      | boolean   | not null, default: false
receiver_read   | boolean   | not null, default: false
receiver_hidden | boolean   | not null, default: false
receiver_del    | boolean   | not null, default: false

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
is_worker       | boolean   | not null
user_bio        | text      | not null
