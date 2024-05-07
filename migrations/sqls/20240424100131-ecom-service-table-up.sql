CREATE SCHEMA main;

SET search_path TO main,public;

GRANT ALL ON SCHEMA main TO public;

CREATE TABLE main.buyers (
        id uuid DEFAULT md5(
            random():: text || clock_timestamp():: text
        ):: uuid NOT NULL,
        display_id varchar(100) NULL,
        profile_image varchar(100) NULL,
        created_by uuid,
        user_tenant_id varchar(100) NULL,
        created_on timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
        deleted bool DEFAULT false NOT NULL,
        deleted_by uuid,
        deleted_on timestamptz DEFAULT current_timestamp NOT NULL,
        modified_by uuid,
        modified_on timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
        CONSTRAINT pk_buyers PRIMARY KEY (id)
    );

CREATE TABLE  main.sellers (
        id uuid DEFAULT md5(
            random():: text || clock_timestamp():: text
        ):: uuid NOT NULL,
        display_id varchar(100) NULL,
        facebook_id varchar(100) NULL,
        instagram_id varchar(100) NULL,
        profile_image varchar(100) NULL,
        company_name varchar(100) NULL,
        website varchar(100) NULL,
        pan_number  varchar(100) NULL,
        gst_name varchar(100) NULL,
        gst_number varchar(100) NULL,
        type_of_firm varchar(100) NULL,
        building             varchar(100),
        area                 varchar(100),
        landmark             varchar(100),
        pin_code             varchar(100),
        city                 varchar(100),
        state_               varchar(100),
        user_tenant_id varchar(100) NULL,
        created_by uuid,
        created_on timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
        deleted bool DEFAULT false NOT NULL,
        deleted_by uuid,
        deleted_on timestamptz DEFAULT current_timestamp NOT NULL,
        modified_by uuid,
        modified_on timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
        CONSTRAINT pk_sellers PRIMARY KEY (id)
    );

CREATE TABLE main.stores (
    id uuid DEFAULT md5(
        random():: text || clock_timestamp():: text
    ):: uuid NOT NULL,
    store_name varchar(100) NULL,
    banner_image varchar(100) NULL,
    logo varchar(100) NULL,
    description varchar(100) NULL,
    catalogue varchar(100) NULL,
    seller_id uuid NOT NULL,
    CONSTRAINT pk_stores PRIMARY KEY (id),
    FOREIGN KEY (seller_id) REFERENCES main.sellers(id)
);

CREATE  TABLE main.category (
	id                   uuid DEFAULT (md5(((random())::text || (clock_timestamp())::text)))::uuid NOT NULL  ,
	name                 varchar(100)    ,
	image                varchar(100)    ,
	description          varchar(100)    ,
	user_tenant_id       varchar(100)    ,
	created_by           uuid    ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	deleted              boolean DEFAULT false NOT NULL  ,
	deleted_by           uuid    ,
	deleted_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	modified_by          uuid    ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pk_sellers_0 PRIMARY KEY ( id ),
	CONSTRAINT unq_category UNIQUE ( name )
);

CREATE  TABLE main.product (
	id                   uuid DEFAULT (md5(((random())::text || (clock_timestamp())::text)))::uuid NOT NULL  ,
	name                 varchar(100)  NOT NULL  ,
	brand                varchar(100)    ,
	description          varchar(100)    ,
	sku                  varchar(100)    ,
	barcode              varchar(100)    ,
	mrp                  varchar(100)    ,
	price                varchar(100)    ,
	category_id          uuid    ,
	group_id             integer    ,
	is_wish_listed       boolean DEFAULT false   ,
	is_added_to_cart     boolean DEFAULT false   ,
	user_tenant_id       varchar(100)    ,
	created_by           uuid    ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	deleted              boolean DEFAULT false NOT NULL  ,
	deleted_by           uuid    ,
	deleted_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	modified_by          uuid    ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pk_sellers_3 PRIMARY KEY ( id )
 );

ALTER TABLE main.product ADD CONSTRAINT fk_product_category FOREIGN KEY ( category_id ) REFERENCES main.category( id );

CREATE  TABLE main.wishlist (
	id                   uuid DEFAULT (md5(((random())::text || (clock_timestamp())::text)))::uuid NOT NULL  ,
	buyer_id             uuid    ,
	user_tenant_id       varchar(100)    ,
	created_by           uuid    ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	deleted              boolean DEFAULT false NOT NULL  ,
	deleted_by           uuid    ,
	deleted_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	modified_by          uuid    ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pk_sellers_12 PRIMARY KEY ( id )
 );

ALTER TABLE main.wishlist ADD CONSTRAINT fk_wishlist_buyers FOREIGN KEY ( buyer_id ) REFERENCES main.buyers( id );

CREATE  TABLE main.wishlist_items (
	id                   uuid DEFAULT (md5(((random())::text || (clock_timestamp())::text)))::uuid NOT NULL  ,
	product_id           uuid    ,
	wishlist_id          uuid    ,
	user_tenant_id       varchar(100)    ,
	created_by           uuid    ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	deleted              boolean DEFAULT false NOT NULL  ,
	deleted_by           uuid    ,
	deleted_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	modified_by          uuid    ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pk_sellers_13 PRIMARY KEY ( id )
 );

ALTER TABLE main.wishlist_items ADD CONSTRAINT fk_wishlist_items_product FOREIGN KEY ( product_id ) REFERENCES main.product( id );

ALTER TABLE main.wishlist_items ADD CONSTRAINT fk_wishlist_items_wishlist FOREIGN KEY ( wishlist_id ) REFERENCES main.wishlist( id );

CREATE  TABLE main.sub_category (
	id                   uuid DEFAULT (md5(((random())::text || (clock_timestamp())::text)))::uuid NOT NULL  ,
	name                 varchar(100)    ,
	image                varchar(100)    ,
	description          varchar(100)    ,
	category_id          uuid    ,
	user_tenant_id       varchar(100)    ,
	created_by           uuid    ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	deleted              boolean DEFAULT false NOT NULL  ,
	deleted_by           uuid    ,
	deleted_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	modified_by          uuid    ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pk_sellers_8 PRIMARY KEY ( id ),
	CONSTRAINT unq_category_0 UNIQUE ( name )
 );

ALTER TABLE main.sub_category ADD CONSTRAINT fk_sub_category_category FOREIGN KEY ( category_id ) REFERENCES main.category( id );

CREATE  TABLE main.option_type (
	id                   uuid DEFAULT (md5(((random())::text || (clock_timestamp())::text)))::uuid NOT NULL  ,
	name                 varchar(100)    ,
	user_tenant_id       varchar(100)    ,
	created_by           uuid    ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	deleted              boolean DEFAULT false NOT NULL  ,
	deleted_by           uuid    ,
	deleted_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	modified_by          uuid    ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pk_sellers_1 PRIMARY KEY ( id ),
	CONSTRAINT unq_option_type UNIQUE ( name )
 );

CREATE  TABLE main.option_value (
	id                   uuid DEFAULT (md5(((random())::text || (clock_timestamp())::text)))::uuid NOT NULL  ,
	"value"              varchar(100)  NOT NULL  ,
	option_type_id       uuid    ,
	user_tenant_id       varchar(100)    ,
	created_by           uuid    ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	deleted              boolean DEFAULT false NOT NULL  ,
	deleted_by           uuid    ,
	deleted_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	modified_by          uuid    ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pk_sellers_2 PRIMARY KEY ( id ),
	CONSTRAINT unq_option_value UNIQUE ( option_type_id ) ,
	CONSTRAINT unq_option_value_0 UNIQUE ( "value" )
 );

ALTER TABLE main.option_value ADD CONSTRAINT fk_option_value_option_type FOREIGN KEY ( option_type_id ) REFERENCES main.option_type( id );

CREATE  TABLE main.product_option (
	id                   uuid DEFAULT (md5(((random())::text || (clock_timestamp())::text)))::uuid NOT NULL  ,
	product_id           uuid    ,
	option_type_id       uuid    ,
	option_value_id      uuid    ,
	user_tenant_id       varchar(100)    ,
	created_by           uuid    ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	deleted              boolean DEFAULT false NOT NULL  ,
	deleted_by           uuid    ,
	deleted_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	modified_by          uuid    ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pk_sellers_4 PRIMARY KEY ( id ),
	CONSTRAINT unq_product_0 UNIQUE ( product_id, option_type_id )
 );

ALTER TABLE main.product_option ADD CONSTRAINT fk_product_option_option_value FOREIGN KEY ( option_value_id ) REFERENCES main.option_value( id );

ALTER TABLE main.product_option ADD CONSTRAINT fk_product_option_option_type FOREIGN KEY ( option_type_id ) REFERENCES main.option_type( id );

ALTER TABLE main.product_option ADD CONSTRAINT fk_product_option_product FOREIGN KEY ( product_id ) REFERENCES main.product( id );

CREATE  TABLE main.buyers_address (
	id                   uuid DEFAULT (md5(((random())::text || (clock_timestamp())::text)))::uuid NOT NULL  ,
	buyer_id             uuid    ,
	name                 varchar(100)    ,
	contact_number       varchar(100)    ,
	building             varchar(100)    ,
	area                 varchar(100)    ,
	pincode              varchar(100)    ,
	landmark             varchar(100)    ,
	label                varchar(100)    ,
	city                 varchar(100)    ,
	state                varchar(100)    ,
	user_tenant_id       varchar(100)    ,
	created_by           uuid    ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	deleted              boolean DEFAULT false NOT NULL  ,
	deleted_by           uuid    ,
	deleted_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	modified_by          uuid    ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pk_buyers_0 PRIMARY KEY ( id )
 );

ALTER TABLE main.buyers_address ADD CONSTRAINT fk_buyers_address_buyers FOREIGN KEY ( buyer_id ) REFERENCES main.buyers( id );

CREATE  TABLE main.payment (
	id                   uuid DEFAULT (md5(((random())::text || (clock_timestamp())::text)))::uuid NOT NULL  ,
	"type"               varchar(100)    ,
	transaction_id       varchar(100)    ,
	user_tenant_id       varchar(100)    ,
	created_by           uuid    ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	deleted              boolean DEFAULT false NOT NULL  ,
	deleted_by           uuid    ,
	deleted_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	modified_by          uuid    ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pk_sellers_15 PRIMARY KEY ( id )
 );

CREATE  TABLE main.order_details (
	id                   uuid DEFAULT (md5(((random())::text || (clock_timestamp())::text)))::uuid NOT NULL  ,
	buyer_id             uuid    ,
	payment_id           uuid    ,
	ordered_on           date    ,
	expected_on          date    ,
	tracking_id          uuid    ,
	total_amount         integer    ,
	is_shipped           boolean    ,
	user_tenant_id       varchar(100)    ,
	created_by           uuid    ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	deleted              boolean DEFAULT false NOT NULL  ,
	deleted_by           uuid    ,
	deleted_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	modified_by          uuid    ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pk_sellers_16 PRIMARY KEY ( id )
 );

ALTER TABLE main.order_details ADD CONSTRAINT fk_order_details_buyers FOREIGN KEY ( buyer_id ) REFERENCES main.buyers( id );

ALTER TABLE main.order_details ADD CONSTRAINT fk_order_details_payment FOREIGN KEY ( payment_id ) REFERENCES main.payment( id );

CREATE  TABLE main.order_items (
	id                   uuid DEFAULT (md5(((random())::text || (clock_timestamp())::text)))::uuid NOT NULL  ,
	product_id           uuid    ,
	quantity             integer    ,
	user_tenant_id       varchar(100)    ,
	created_by           uuid    ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	deleted              boolean DEFAULT false NOT NULL  ,
	deleted_by           uuid    ,
	deleted_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	modified_by          uuid    ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	order_id             uuid    ,
	CONSTRAINT pk_sellers_14 PRIMARY KEY ( id )
 );

ALTER TABLE main.order_items ADD CONSTRAINT fk_order_items_product FOREIGN KEY ( product_id ) REFERENCES main.product( id );

ALTER TABLE main.order_items ADD CONSTRAINT fk_order_items_order_details FOREIGN KEY ( order_id ) REFERENCES main.order_details( id );

CREATE  TABLE main.cart (
	id                   uuid DEFAULT (md5(((random())::text || (clock_timestamp())::text)))::uuid NOT NULL  ,
	buyer_id             uuid    ,
	user_tenant_id       varchar(100)    ,
	created_by           uuid    ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	deleted              boolean DEFAULT false NOT NULL  ,
	deleted_by           uuid    ,
	deleted_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	modified_by          uuid    ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pk_sellers_10 PRIMARY KEY ( id )
 );

ALTER TABLE main.cart ADD CONSTRAINT fk_cart_buyers FOREIGN KEY ( buyer_id ) REFERENCES main.buyers( id );

CREATE  TABLE main.cart_items (
	id                   uuid DEFAULT (md5(((random())::text || (clock_timestamp())::text)))::uuid NOT NULL  ,
	cart_id              uuid    ,
	product_id           uuid    ,
	user_tenant_id       varchar(100)    ,
	created_by           uuid    ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	deleted              boolean DEFAULT false NOT NULL  ,
	deleted_by           uuid    ,
	deleted_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	modified_by          uuid    ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pk_sellers_11 PRIMARY KEY ( id )
 );

ALTER TABLE main.cart_items ADD CONSTRAINT fk_cart_items_product FOREIGN KEY ( product_id ) REFERENCES main.product( id );

ALTER TABLE main.cart_items ADD CONSTRAINT fk_cart_items_cart FOREIGN KEY ( cart_id ) REFERENCES main.cart( id );

CREATE  TABLE main.product_review (
	id                   uuid DEFAULT (md5(((random())::text || (clock_timestamp())::text)))::uuid NOT NULL  ,
	product_id           uuid    ,
	no_of_stars          integer    ,
	description          varchar(500)    ,
	user_id              uuid    ,
	image                varchar(100)    ,
	user_tenant_id       varchar(100)    ,
	created_by           uuid    ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	deleted              boolean DEFAULT false NOT NULL  ,
	deleted_by           uuid    ,
	deleted_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	modified_by          uuid    ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pk_sellers_7 PRIMARY KEY ( id )
 );

ALTER TABLE main.product_review ADD CONSTRAINT fk_product_review_product FOREIGN KEY ( product_id ) REFERENCES main.product( id );

CREATE  TABLE main.skus (
	id                   uuid DEFAULT (md5(((random())::text || (clock_timestamp())::text)))::uuid NOT NULL  ,
	sku                  varchar(100)    ,
	product_id           uuid    ,
	description          varchar(100)    ,
	user_tenant_id       varchar(100)    ,
	created_by           uuid    ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	deleted              boolean DEFAULT false NOT NULL  ,
	deleted_by           uuid    ,
	deleted_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	modified_by          uuid    ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pk_sellers_9 PRIMARY KEY ( id )
 );

ALTER TABLE main.skus ADD CONSTRAINT fk_skus_product FOREIGN KEY ( product_id ) REFERENCES main.product( id );

CREATE  TABLE main.media (
	id                   uuid DEFAULT (md5(((random())::text || (clock_timestamp())::text)))::uuid NOT NULL  ,
	type                 varchar(100)    ,
	url                  varchar(100)  NOT NULL  ,
	product_id           uuid    ,
	review_id            uuid    ,
	user_tenant_id       varchar(100)    ,
	created_by           uuid    ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	deleted              boolean DEFAULT false NOT NULL  ,
	deleted_by           uuid    ,
	deleted_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	modified_by          uuid    ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pk_sellers_17 PRIMARY KEY ( id )
 );

ALTER TABLE main.media ADD CONSTRAINT fk_media_product_review FOREIGN KEY ( review_id ) REFERENCES main.product_review( id );

ALTER TABLE main.media ADD CONSTRAINT fk_media_product FOREIGN KEY ( product_id ) REFERENCES main.product( id );

CREATE OR REPLACE FUNCTION main.moddatetime() RETURNS
TRIGGER LANGUAGE PLPGSQL AS
	$function$ BEGIN NEW.modified_on = now();
	RETURN NEW;
END;

$function$ ;

CREATE TRIGGER mdt_buyers
	BEFORE
	UPDATE
	    ON main.buyers FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');

CREATE TRIGGER mdt_sellers
	BEFORE
	UPDATE
	    ON main.sellers FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');

CREATE TRIGGER mdt_stores
	BEFORE
	UPDATE
	    ON main.stores FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');

CREATE TRIGGER mdt_category
	BEFORE
	UPDATE
	    ON main.category FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');

CREATE TRIGGER mdt_product
	BEFORE
	UPDATE
	    ON main.product FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');


CREATE TRIGGER mdt_buyers_address
	BEFORE
	UPDATE
	    ON main.buyers_address FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');

CREATE TRIGGER mdt_cart_items
	BEFORE
	UPDATE
	    ON main.cart_items FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');

CREATE TRIGGER mdt_cart
	BEFORE
	UPDATE
	    ON main.cart FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');

CREATE TRIGGER mdt_option_type
	BEFORE
	UPDATE
	    ON main.option_type FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');

CREATE TRIGGER mdt_option_value
	BEFORE
	UPDATE
	    ON main.option_value FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');

CREATE TRIGGER mdt_order_details
	BEFORE
	UPDATE
	    ON main.order_details FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');

CREATE TRIGGER mdt_order_items
	BEFORE
	UPDATE
	    ON main.order_items FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');

CREATE TRIGGER mdt_payment
	BEFORE
	UPDATE
	    ON main.payment FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');

CREATE TRIGGER mdt_product_option
	BEFORE
	UPDATE
	    ON main.product_option FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');

CREATE TRIGGER mdt_product_review
	BEFORE
	UPDATE
	    ON main.product_review FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');

CREATE TRIGGER mdt_skus
	BEFORE
	UPDATE
	    ON main.skus FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');

CREATE TRIGGER mdt_sub_category
	BEFORE
	UPDATE
	    ON main.sub_category FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');

CREATE TRIGGER mdt_wishlist_items
	BEFORE
	UPDATE
	    ON main.wishlist_items FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');

CREATE TRIGGER mdt_wishlist
	BEFORE
	UPDATE
	    ON main.wishlist FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');

CREATE TRIGGER mdt_media
	BEFORE
	UPDATE
	    ON main.media FOR EACH ROW
	EXECUTE
	    PROCEDURE main.moddatetime('modified_on');

