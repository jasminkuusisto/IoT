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
    id integer NOT NULL DEFAULT nextval('records_id_seq'::regclass),
    date timestamp without time zone NOT NULL,
    CONSTRAINT records_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.records
    OWNER to postgres;
