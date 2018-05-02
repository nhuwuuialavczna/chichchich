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

Date: 2018-04-12 02:55:17
*/


-- ----------------------------
-- Table structure for trangthai
-- ----------------------------
DROP TABLE IF EXISTS "public"."trangthai";
CREATE TABLE "public"."trangthai" (
"thongbaotong" varchar(4000) COLLATE "default",
"thongbaorieng" varchar(4000) COLLATE "default",
"emailthongbaorieng" varchar(200) COLLATE "default",
"emaillivestream" varchar(200) COLLATE "default",
"emailliveocde" varchar(200) COLLATE "default"
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of trangthai
-- ----------------------------
INSERT INTO "public"."trangthai" VALUES ('Trang web trên bước hoàn thiện. Nếu bạn có phát hiện ra lỗi xin hãy liên hệ với chúng tôi. Xin cảm ơn', 'Thằng lồn', '123@gmail.com,admin@gmai.com', 'admin@gmai.com', 'admin@gmai.com');

-- ----------------------------
-- Alter Sequences Owned By 
-- ----------------------------
