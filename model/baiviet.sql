/*
Navicat PGSQL Data Transfer

Source Server         : hau
Source Server Version : 100300
Source Host           : ec2-54-204-21-226.compute-1.amazonaws.com:5432
Source Database       : df07n687imb2qc
Source Schema         : public

Target Server Type    : PGSQL
Target Server Version : 100300
File Encoding         : 65001

Date: 2018-04-10 05:50:57
*/


-- ----------------------------
-- Table structure for baiviet
-- ----------------------------
DROP TABLE IF EXISTS "public"."baiviet";
CREATE TABLE "public"."baiviet" (
"mabaiviet" varchar(255) COLLATE "default" NOT NULL,
"tenbaiviet" varchar(255) COLLATE "default",
"thoigian" varchar(255) COLLATE "default",
"danhgia" varchar(255) COLLATE "default",
"hinhanh" varchar(255) COLLATE "default",
"email" varchar(255) COLLATE "default",
"noidung" varchar(4000) COLLATE "default",
"dinhkem" varchar(4000) COLLATE "default"
)
WITH (OIDS=FALSE)

;
COMMENT ON COLUMN "public"."baiviet"."mabaiviet" IS 'Mã của bài viết. Username cộng với thời gian';
COMMENT ON COLUMN "public"."baiviet"."tenbaiviet" IS 'Tên của bài viết';
COMMENT ON COLUMN "public"."baiviet"."thoigian" IS 'Thời gian đăng tải';
COMMENT ON COLUMN "public"."baiviet"."danhgia" IS 'Đánh giá về bài viết';
COMMENT ON COLUMN "public"."baiviet"."hinhanh" IS 'Hình ảnh của bài viết';
COMMENT ON COLUMN "public"."baiviet"."email" IS 'Người đã đăng bài viết này';
COMMENT ON COLUMN "public"."baiviet"."noidung" IS 'Nội dung của bài viết';

-- ----------------------------
-- Records of baiviet
-- ----------------------------

-- ----------------------------
-- Alter Sequences Owned By 
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table baiviet
-- ----------------------------
ALTER TABLE "public"."baiviet" ADD PRIMARY KEY ("mabaiviet");

-- ----------------------------
-- Foreign Key structure for table "public"."baiviet"
-- ----------------------------
ALTER TABLE "public"."baiviet" ADD FOREIGN KEY ("email") REFERENCES "public"."account" ("email") ON DELETE CASCADE ON UPDATE CASCADE;
