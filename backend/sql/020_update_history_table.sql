CREATE TYPE enum_history_action AS ENUM (
    'get',
    'create',
    'update',
    'delete',
    'login',
    'logout'
);

ALTER TABLE user_histories 
    ADD COLUMN "action" enum_history_action NOT NULL,
    ADD COLUMN "entity_id" uuid,
    ADD COLUMN "entity_name" character varying (255),
    ADD COLUMN "entity_type" character varying (100);

