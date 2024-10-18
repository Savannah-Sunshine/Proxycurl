create table users {
    id int primary key,
    email varchar(255) unique,
    -- username varchar(255) unique, -- don't want, use other things to identify user
    display_name varchar(255),
    tags varchar(255)[] default '{}',
    deleted boolean default false,
    system_permissions varchar(255)[] default '{}',
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
}