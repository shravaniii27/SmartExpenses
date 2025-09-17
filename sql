CREATE TABLE myapp_receipt (
    "id" serial NOT NULL PRIMARY KEY,
    "store_name" varchar(200) NOT NULL,
    "total_amount" numeric(10, 2) NOT NULL,
    "scan_date" timestamp with time zone NOT NULL,
    "scanned_by_id" integer NOT NULL
);

CREATE TABLE myapp_item (
    "id" serial NOT NULL PRIMARY KEY,
    "receipt_id" integer NOT NULL,
    "name" varchar(200) NOT NULL,
    "price" numeric(10, 2) NOT NULL
);

CREATE TABLE myapp_payment (
    "id" serial NOT NULL PRIMARY KEY,
    "receipt_id" integer NOT NULL,
    "payer_id" integer NOT NULL,
    "recipient_id" integer NOT NULL,
    "amount_paid" numeric(10, 2) NOT NULL,
    "is_settled" boolean NOT NULL
);