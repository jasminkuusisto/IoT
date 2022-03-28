-- Database: IoT

CREATE DATABASE "IoT"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_Finland.1252'
    LC_CTYPE = 'English_Finland.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
	
-- Table Records

CREATE TABLE public.records
(
    id SERIAL,
    date timestamp without time zone NOT NULL,
    description VARCHAR(500),
    CONSTRAINT records_pkey PRIMARY KEY (id)
)

ALTER TABLE public.records
    OWNER to postgres;
