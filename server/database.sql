CREATE DATABASE IVMS_DB;

-- create extension if not exists "uuid-ossp"
--=========================================================================================
-- ADMIN
--=========================================================================================
CREATE TABLE ADMIN (
    ADMIN_ID uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    ADMIN_USERNAME VARCHAR(255) not null,
    ADMIN_NAME VARCHAR(255) not null,
    ADMIN_EMAIL VARCHAR(255) not null,
    ADMIN_PASSWORD VARCHAR (255) not null
);
--=========================================================================================
--=========================================================================================

--=========================================================================================
-- RETAILER
--=========================================================================================
CREATE TABLE RETAILER(
    R_ID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    R_MOBILE_NUM VARCHAR(200),
    R_NAME VARCHAR(200),
    R_USERNAME VARCHAR(200),
    R_PASSWORD VARCHAR(200),
    R_ADDRESS VARCHAR(500),
    R_EMAIL VARCHAR(500),
    R_APPROVAL_STATUS VARCHAR(20) DEFAULT 'FALSE'
);
--=========================================================================================
--=========================================================================================

--=========================================================================================
-- INVENTORY
--=========================================================================================
CREATE TABLE INVENTORY(
    INVENTORY_ID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    R_ID uuid,
    INVENTORY_COUNT INTEGER DEFAULT 0,
    INVENTORY_TYPE VARCHAR(20),
    INVENTORY_DESCRIPTION VARCHAR(200),
    INVENTORY_MAX_COUNT INTEGER
);

ALTER TABLE INVENTORY ADD CONSTRAINT retailerFK FOREIGN KEY(R_ID) REFERENCES RETAILER(R_ID);
--=========================================================================================
--=========================================================================================

--=========================================================================================
-- RETAILER_VIEW
--=========================================================================================
CREATE VIEW RETAILER_ACCESSES AS
SELECT RETAILER.R_ID,R_NAME,R_APPROVAL_STATUS,INVENTORY.INVENTORY_ID
FROM RETAILER JOIN INVENTORY ON RETAILER.R_ID=INVENTORY.R_ID;
--=========================================================================================
--=========================================================================================

--=========================================================================================
-- NOTIFICATIONS
--=========================================================================================
CREATE TABLE NOTIFICATIONS(
    N_ID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    REFERRER_ID uuid  NOT NULL,
    string VARCHAR(500) NOT NULL,
    type INTEGER NOT NULL
);
--=========================================================================================
--=========================================================================================

--=========================================================================================
-- PRODUCT
--=========================================================================================
CREATE TABLE PRODUCT(
    INVENTORY_ID uuid,
    PRODUCT_ID VARCHAR(200) NOT NULL DEFAULT 'P-',
    PRODUCT_NAME VARCHAR(50),
    PRODUCT_COUNT INTEGER,
    PRODUCT_DESCRIPTION VARCHAR(200),
    PRODUCT_TYPE VARCHAR(200)
);

ALTER TABLE PRODUCT ADD CONSTRAINT PRODUCTPK PRIMARY KEY(PRODUCT_ID);

CREATE SEQUENCE PRODUCT_SEQUENCE
START 10
INCREMENT 1
OWNED BY PRODUCT.PRODUCT_id;

CREATE OR REPLACE FUNCTION PRODUCT_NEW_ID()
    RETURNS TRIGGER 
    AS $$
    BEGIN 
        -- RAISE NOTICE '%', CONCAT(NEW.R_ID, NEXTVAL('SMTH'));
        NEW.PRODUCT_id := CONCAT(NEW.PRODUCT_id, NEXTVAL('PRODUCT_SEQUENCE'));
        return NEW;
    END;
    $$ LANGUAGE plpgsql;    
CREATE TRIGGER PRODUCT_NEW
    BEFORE INSERT ON PRODUCT
    FOR EACH ROW
    EXECUTE PROCEDURE PRODUCT_NEW_ID();
--=========================================================================================
--=========================================================================================

--=========================================================================================
-- INBOUND
--=========================================================================================
CREATE TABLE INBOUND(
	INBOUND_ID VARCHAR(200) PRIMARY KEY DEFAULT 'I-',
	SENDER_ID VARCHAR(200),
	Approval_Status VARCHAR(10) DEFAULT 'False',
	Inventory_ID uuid,
	PRODUCT_COUNT INTEGER,
	PRODUCT_NAME VARCHAR(200)
);
ALTER TABLE INBOUND ADD CONSTRAINT inboundInvenFK FOREIGN KEY(Inventory_ID) REFERENCES INVENTORY(INVENTORY_ID);

CREATE SEQUENCE INBOUND_SEQUENCE
START 1
INCREMENT 1
OWNED BY INBOUND.INBOUND_id;

CREATE OR REPLACE FUNCTION INBOUND_NEW_ID()
    RETURNS TRIGGER 
    AS $$
    BEGIN 
        -- RAISE NOTICE '%', CONCAT(NEW.R_ID, NEXTVAL('SMTH'));
        NEW.INBOUND_id := CONCAT(NEW.INBOUND_id, NEXTVAL('INBOUND_SEQUENCE'));
        return NEW;
    END;
    $$ LANGUAGE plpgsql;    
CREATE TRIGGER INBOUND_NEW
    BEFORE INSERT ON INBOUND
    FOR EACH ROW
    EXECUTE PROCEDURE INBOUND_NEW_ID();
--=========================================================================================
--=========================================================================================

--=========================================================================================
-- OUTBOUND
--=========================================================================================
CREATE TABLE OUTBOUND(
	OUTBOUND_ID VARCHAR(200) PRIMARY KEY DEFAULT 'O-',
	Inventory_ID uuid,
	PRODUCT_ID VARCHAR(200),
	PRODUCT_COUNT INTEGER,
	RECIEVER_ID VARCHAR(200)
);

CREATE SEQUENCE OUTBOUND_SEQUENCE
START 1
INCREMENT 1
OWNED BY OUTBOUND.OUTBOUND_id;

CREATE OR REPLACE FUNCTION OUTBOUND_NEW_ID()
    RETURNS TRIGGER 
    AS $$
    BEGIN 
        -- RAISE NOTICE '%', CONCAT(NEW.R_ID, NEXTVAL('SMTH'));
        NEW.OUTBOUND_id := CONCAT(NEW.OUTBOUND_id, NEXTVAL('OUTBOUND_SEQUENCE'));
        return NEW;
    END;
    $$ LANGUAGE plpgsql;    
CREATE TRIGGER OUTBOUND_NEW
    BEFORE INSERT ON OUTBOUND
    FOR EACH ROW
    EXECUTE PROCEDURE OUTBOUND_NEW_ID();
--=========================================================================================
--=========================================================================================

--=========================================================================================
-- RECIEVER
--=========================================================================================
CREATE TABLE RECIEVER (
    R_ID VARCHAR(200) PRIMARY KEY DEFAULT 'R-',
    R_NAME VARCHAR(200) UNIQUE,
    R_MOBILE_NUM VARCHAR(200),
    R_ADDRESS VARCHAR(500),
    R_EMAIL VARCHAR(200)
);

CREATE SEQUENCE RECIEVER_SEQUENCE
START 10
INCREMENT 1
OWNED BY RECIEVER.r_id;

CREATE OR REPLACE FUNCTION R_ID()
    RETURNS TRIGGER 
    AS $$
    BEGIN 
        -- RAISE NOTICE '%', CONCAT(NEW.R_ID, NEXTVAL('SMTH'));
        NEW.R_ID := CONCAT(NEW.R_ID, NEXTVAL('RECIEVER_SEQUENCE'));
        return NEW;
    END;
    $$ LANGUAGE plpgsql;    
CREATE TRIGGER RECIEVER_NEW
    BEFORE INSERT ON RECIEVER
    FOR EACH ROW
    EXECUTE PROCEDURE R_ID();
--=========================================================================================
--=========================================================================================

--=========================================================================================
-- SENDER
--=========================================================================================
CREATE TABLE SENDER (
    S_ID VARCHAR(200) PRIMARY KEY DEFAULT 'S-',
    S_NAME VARCHAR(50),
    S_MOBILE_NUM VARCHAR(200),
    S_ADDRESS VARCHAR(500),
    S_EMAIL VARCHAR(200)
);

CREATE SEQUENCE SENDER_SEQUENCE
START 10
INCREMENT 1
OWNED BY SENDER.s_id;

CREATE OR REPLACE FUNCTION S_ID()
    RETURNS TRIGGER 
    AS $$
    BEGIN 
        -- RAISE NOTICE '%', CONCAT(NEW.R_ID, NEXTVAL('SMTH'));
        NEW.s_ID := CONCAT(NEW.S_ID, NEXTVAL('SENDER_SEQUENCE'));
        return NEW;
    END;
    $$ LANGUAGE plpgsql;    
CREATE TRIGGER SENDER_NEW
    BEFORE INSERT ON SENDER
    FOR EACH ROW
    EXECUTE PROCEDURE S_ID();


ALTER TABLE INBOUND ADD CONSTRAINT inboundSendFK FOREIGN KEY(SENDER_ID) REFERENCES SENDER(S_ID);
--=========================================================================================
--=========================================================================================

--=========================================================================================
-- HISTORY
--=========================================================================================
CREATE TABLE HISTORY (
    HISTORY_ID SERIAL PRIMARY KEY,
    ID VARCHAR(200) UNIQUE NOT NULL,
    ENTRY_TIME TIMESTAMP,
    STATUS VARCHAR(20) DEFAULT 'COMPLETED'
);
--=========================================================================================
--=========================================================================================

--=========================================================================================
-- DATABASE TRIGGERS
--=========================================================================================

--============================
--password check in retailer (DONE)
--============================

CREATE OR REPLACE FUNCTION CHECK_PASSWORD()
    RETURNS TRIGGER
    AS $$
    BEGIN 
        IF length(NEW.R_PASSWORD)<8 THEN
            RAISE NOTICE 'Password Length not sufficient!';
            RETURN NULL;
        ELSE 
            RETURN NEW;
        END IF;
        
    END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE TRIGGER check_pass 
    BEFORE INSERT OR UPDATE ON RETAILER
    FOR EACH ROW
    EXECUTE FUNCTION CHECK_PASSWORD();

--============================
--CHECK PHONE NUMBER LENGTH = 11 (DONE)
--============================

CREATE OR REPLACE FUNCTION CHECK_PHONE()
    RETURNS TRIGGER
    AS $$
    BEGIN 
        IF length(NEW.R_MOBILE_NUM)<11 OR length(NEW.R_MOBILE_NUM)>11 THEN
            RAISE NOTICE 'Mobile no. not possible';
            RETURN NULL;
        ELSE 
            RETURN NEW;
        END IF;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER check_num 
    BEFORE INSERT OR UPDATE ON RETAILER
    FOR EACH ROW
    EXECUTE FUNCTION CHECK_PHONE();

--=====================================
--TRIGGER TO CHECK IF INVENTORY FULL 
--=====================================
CREATE OR REPLACE FUNCTION product_function()
    returns trigger
    AS $$
    BEGIN 
        IF NEW.INVENTORY_COUNT<NEW.INVENTORY_MAX_COUNT THEN
            RETURN NEW;
        ELSE
            RAISE NOTICE 'INVENTORY FULL';
            RETURN NULL;
        end if;
    END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE TRIGGER CHECKPRODUCT
    BEFORE INSERT OR UPDATE 
    ON PRODUCT
    FOR EACH ROW
    EXECUTE PROCEDURE product_function();

--=====================================
--TRIGGER TO CHECK IF INVENTORY BECOMES NEGATIVE (DONE)
--=====================================
CREATE OR REPLACE TRIGGER CHECKPRODUCT1
    BEFORE INSERT OR UPDATE 
    ON INVENTORY
    FOR EACH ROW
    EXECUTE PROCEDURE product_func();
CREATE OR REPLACE FUNCTION product_func()
    returns trigger
    AS $$
    BEGIN 
        IF NEW.INVENTORY_COUNT > 0 THEN
            RETURN NEW;
        ELSE
            RAISE NOTICE "INVENTORY COUNT CAN'T BE NEGATIVE";
            RETURN NULL;
        end if;
    END;
$$ LANGUAGE plpgsql;

--============================
--Trigger for inserting inventory count(DONE)
--============================
CREATE OR REPLACE FUNCTION NEW_INVENTORY_COUNT()
    RETURNS TRIGGER
    AS $$
    DECLARE 
        PREV_COUNT INTEGER;
        COUNT INTEGER;
        id uuid;
        MAX_COUNT INTEGER;
    BEGIN 
        select inventory_count INTO COUNT from inventory where Inventory_ID= NEW.INVENTORY_ID;
        select INVENTORY_MAX_COUNT INTO MAX_COUNT from inventory where Inventory_ID= NEW.INVENTORY_ID;
        RAISE NOTICE '%', new.PRODUCT_COUNT;
        IF COUNT+new.PRODUCT_COUNT <= MAX_COUNT AND NEW.PRODUCT_COUNT > 0 THEN
            COUNT := COUNT+new.PRODUCT_COUNT;
            UPDATE INVENTORY SET INVENTORY_COUNT = COUNT WHERE INVENTORY_ID = NEW.INVENTORY_ID;  
            RETURN NEW;
        ELSE
            RAISE NOTICE 'NOT POSSIBLE';
        END IF;
        RETURN NULL;
    END;
    $$ LANGUAGE plpgsql;
CREATE OR REPLACE TRIGGER NEW_INVENTORY
    BEFORE INSERT
    ON PRODUCT 
    FOR EACH ROW 
    EXECUTE PROCEDURE NEW_INVENTORY_COUNT();

--============================
--Trigger for updating inventory count(DONE)
--============================

CREATE OR REPLACE FUNCTION ADD_INBOUND_HISTORY()
    RETURNS TRIGGER
    AS $$
    BEGIN 
        IF NEW.Approval_Status = 'True' THEN
            INSERT INTO HISTORY (ID, ENTRY_TIME) VALUES (new.INBOUND_ID, CURRENT_TIMESTAMP);
        END if;
    END;
    $$ LANGUAGE plpgsql;
CREATE OR REPLACE TRIGGER ADD_HISTORY 
    AFTER UPDATE 
    ON INBOUND
    FOR EACH ROW 
    EXECUTE PROCEDURE ADD_INBOUND_HISTORY();

--=========================================================================================
--=========================================================================================