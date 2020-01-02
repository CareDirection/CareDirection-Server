# CareDirection-Server

<img src="resource/logo.png" width="100">

Self Care의 방향성을 제시하다, Care Direction

- **개발 기간 : 19.12.21 ~ 20.12.04 ( 2주 )**

- **[API Document](https://github.com/CareDirection/CareDirection-Server/wiki)**

  

## Develop Environment

- Complier - **WebStorm** / ver.2019.2.1

- Language - **JavaScript**

 - Architecture - **MVC**
   + Controller

   + DAO

   + Service

- Cloud - **AWS**
  + **AWS EC2**
  
  + **AWS RDS**
  
  + **AWS Lambda**
  
  + **AWS S3**
  
    

## Server Architecture

<img src="">



## ERD

<img src="">



## Dependencies

* **Release**
| Description                                                  | Name / Version              |
| ------------------------------------------------------------ | --------------------------- |
| [Validation Checker](https://hapi.dev/family/joi/)           | @hapi/joi / 16.1.8          |
| [AWS](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/welcome.html) | aws-sdk / 2.270.1           |
| [JWT Token](https://www.npmjs.com/package/jsonwebtoken)      | jsonwebtoken / 8.5.1        |
| [Date Handler](https://momentjs.com/docs/)                   | moment / 2.24.0             |
| [Image Handler]()                                            | multer / 1.4.2              |
|                                                              | multer-s3-transform / 2.3.2 |
| [MySQL DataBase]()                                           | mysql / 2.17.1              |
|                                                              | promise-mysql / 3.3.1       |
| [Simplified Http Request](https://www.npmjs.com/package/request) | request / 2.88.0            |
| [Image Resizer](https://sharp.pixelplumbing.com/en/stable/)  | sharp / 0.23.4              |
| [URL compressor](https://www.npmjs.com/package/shortid)      | shortid / 2.2.15            |
|[Password Encryptor / Decryptor](https://nodejs.org/api/crypto.html)|Node.js v13.5.0 built-in|

* **Develop**
| Description                                       | Name / Version                     |
| ------------------------------------------------- | ---------------------------------- |
| [ESLint Code Convetion]()                         | eslint / 4.19.1                    |
|                                                   | eslint-config-airbnb-base / 13.0.0 |
|                                                   | eslint-plugin-import / 2.13.0      |
| [JavaScript Test FrameWork](https://mochajs.org/) | mocha / 6.2.2                      |



## Main Function

* 제품별 사용자 맞춤 데이터 (그래프)     **<수정필요!!!!>**

* 이미지 리사이징                                **<수정필요!!!!>**



## Team Role Sharing

**GitHub Issue**를 활용하여 역할 분담을 나누었고, 각자 라벨을 붙여 티켓의 카테고리를 정확하게 분류하였습니다. 
또한,  **GitHub Project (Kanban Chart)** 를 활용하여 개발 진행 현황을 가시적으로 나타내었습니다.

* [혁](https://github.com/CareDirection/CareDirection-Server/issues?q=is%3Aissue+is%3Aclosed+label%3A%ED%98%81)
* [재현](https://github.com/CareDirection/CareDirection-Server/issues?q=is%3Aissue+is%3Aclosed+label%3A%EC%9E%AC%ED%98%84)
* [다은](https://github.com/CareDirection/CareDirection-Server/issues?q=is%3Aissue+is%3Aclosed+label%3A%EB%8B%A4%EC%9D%80)
* [승희](https://github.com/CareDirection/CareDirection-Server/issues?q=is%3Aissue+is%3Aclosed+label%3A%EC%8A%B9%ED%9D%AC)
* [전체 역할분담](https://github.com/CareDirection/CareDirection-Server/issues?q=is%3Aissue+is%3Aclosed)
* [Kanban Chart](https://github.com/orgs/CareDirection/projects/1?card_filter_query=label%3Aserver)



## Work Flow
<img src="resource/workflow.png">




## Library Study

* [ESLint](./study/ESLint.md)
* [joi](./study/joi.md)
* [mocha](./study/mocha.md)
* [should](./study/should.md)
* [jwt](./study/jwt.md)
* [supertest](./study/supertest.md)




## Collaborator

* **윤혁** - [Malibin](https://github.com/nightmare73)
* **이재현** - [2Re-play](https://github.com/2Re-play)
* **심다은** - [Danidani](https://github.com/DaEunShim)
* **양승희** - [seunghee63](https://github.com/seunghee63)

[Contributor List](https://github.com/CareDirection/CareDirection-Server/graphs/contributors)




