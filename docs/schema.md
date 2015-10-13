# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
bio             | text      | not null

## tasks
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
title         | string    | not null
description   | text      | not null
location      | string    | not null
creator_id    | integer   | not null, foreign key (references users), indexed
worker_id     | integer   | not null, foreign key (references users), indexed

## timeslices (task detail 1)
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
date_start    | datetime  | not null
date_end      | datetime  | not null
timable_id    | integer   | not null, foreign key (references users(workers) or tasks), indexed
timable_type  | datetime  | not null

## taskreviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
creator_id  | integer   | not null, foreign key (references users), indexed
worker_id   | integer   | not null, foreign key (references users), indexed
task_id     | integer   | not null, foreign key (references tasks), indexed
is_positive | boolean   | not null
description | text      | not null

### Bonuses
## tasktypes (task detail 2, possibly bonus)
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
description       | string    | not null
tasktypable_id    | integer   | not null, foreign key (references users(workers) or tasks), indexed
tasktypable_type  | string    | not null
payrate           | integer   | not null (only used if tasktypable_type is users, otherwise is null)
good_review_count | integer   | not null, default: 0 (only used if qualifiable_type is users, otherwise is null)
bad_review_count  | integer   | not null, default: 0 (only used if qualifiable_type is users, otherwise is null)

## qualifications (task detail 3, possibly bonus)
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
description       | string    | not null
qualifiable_id    | integer   | not null, foreign key (references users(workers) or tasks), indexed
qualifiable_type  | integer   | not null

## notifications (bonus)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users), indexed
sender_id   | integer   | not null, foreign key (references users), indexed
receiver_id | integer   | not null, foreign key (references users), indexed
message     | text      | not null
is_read     | boolean   | not null, default: false
