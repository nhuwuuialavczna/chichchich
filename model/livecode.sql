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

Date: 2018-04-10 05:53:17
*/


-- ----------------------------
-- Table structure for livecode
-- ----------------------------
DROP TABLE IF EXISTS "public"."livecode";
CREATE TABLE "public"."livecode" (
"malivecode" varchar(255) COLLATE "default",
"tenlivecode" varchar(255) COLLATE "default",
"thoigianbatdau" varchar(255) COLLATE "default",
"thoigianketthuc" varchar(255) COLLATE "default",
"email" varchar(255) COLLATE "default",
"mota" varchar(4000) COLLATE "default"
)
WITH (OIDS=FALSE)

;
COMMENT ON COLUMN "public"."livecode"."malivecode" IS 'Mã của live code';
COMMENT ON COLUMN "public"."livecode"."tenlivecode" IS 'Tên live code';
COMMENT ON COLUMN "public"."livecode"."thoigianbatdau" IS 'Thời gian bắt đầu live code';
COMMENT ON COLUMN "public"."livecode"."thoigianketthuc" IS 'Thời gian kết thúc livecode';
COMMENT ON COLUMN "public"."livecode"."email" IS 'Người nắm giữ live code này';
COMMENT ON COLUMN "public"."livecode"."mota" IS 'Mô tả chi tiết cho việc live code này';

-- ----------------------------
-- Records of livecode
-- ----------------------------

-- ----------------------------
-- Alter Sequences Owned By 
-- ----------------------------
