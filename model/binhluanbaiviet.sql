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

Date: 2018-04-10 05:52:50
*/


-- ----------------------------
-- Table structure for binhluanbaiviet
-- ----------------------------
DROP TABLE IF EXISTS "public"."binhluanbaiviet";
CREATE TABLE "public"."binhluanbaiviet" (
"mabinhluan" varchar(255) COLLATE "default" NOT NULL,
"noidung" varchar(255) COLLATE "default",
"mabaiviet" varchar(255) COLLATE "default",
"email" varchar(255) COLLATE "default",
"thoigian" varchar(255) COLLATE "default"
)
WITH (OIDS=FALSE)

;
COMMENT ON COLUMN "public"."binhluanbaiviet"."mabinhluan" IS 'Mã bình luận';
COMMENT ON COLUMN "public"."binhluanbaiviet"."noidung" IS 'Nội dung của bình luận';
COMMENT ON COLUMN "public"."binhluanbaiviet"."mabaiviet" IS 'Mã của bài viết';
COMMENT ON COLUMN "public"."binhluanbaiviet"."email" IS 'Người đã bình luận';
COMMENT ON COLUMN "public"."binhluanbaiviet"."thoigian" IS 'Thời gian bình luận';

-- ----------------------------
-- Records of binhluanbaiviet
-- ----------------------------

-- ----------------------------
-- Alter Sequences Owned By 
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table binhluanbaiviet
-- ----------------------------
ALTER TABLE "public"."binhluanbaiviet" ADD PRIMARY KEY ("mabinhluan");

-- ----------------------------
-- Foreign Key structure for table "public"."binhluanbaiviet"
-- ----------------------------
ALTER TABLE "public"."binhluanbaiviet" ADD FOREIGN KEY ("mabaiviet") REFERENCES "public"."baiviet" ("mabaiviet") ON DELETE CASCADE ON UPDATE CASCADE;
