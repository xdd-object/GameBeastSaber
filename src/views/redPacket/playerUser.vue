<template>
    <avue-crud :option="option"
               :page.sync="page"
               :data="data"
               @search-change="searchRecord"
               @current-change="searchPageRecord"
               @on-load="onLoad"
               @size-change="sizeChange"
               @refresh-change="onLoad"/>

  </template>
  
  <script>
  
  import {reqRedpacketRoom} from "@/api/redPacket/index";
  import dayjs from 'dayjs'


  const statusRecordMap = {
    0: '离线',
    1: '在线',
  }
  
  const typeMap = {
    0: '真人',
    1: '机器人',
  }
  export default {
    name: "wel",
    data() {
      return {
        page: {
          total: 0
        },
        query: {
          pageNum: 1,
          pageSize: 10,
          roomId: null,
          num: null,
          type: null,
          killRoom: null,
          status: null,
        },
        data: [
        ],
        option: {
          delBtn: false,
          editBtn: false,
          menuWidth: 150,
          border:true,
          align:'center',
          menuAlign:'center',
          addBtn: false,
        menu: false,

          column:[
          {
              label: "id",
              prop: "id",
              span: 8,
              row: true
            },
            {
              label: "用户id",
              prop: "userId",
              span: 8,
              search: true,
              row: true
            },
            {
              label: "cid",
              prop: "cid",
              span: 8,
              row: true
            }, {
              label: "用户名",
              prop: "nickname",
              span: 8,
              row: true
            },
            {
              label: "头像",
              prop: "avatar",
              span: 8,
              row: true,
              html:true,
              formatter: (_row, value)=> {
                return  `<img style="width:100px;height:100px" src='${value}' alt=''>`//
              },
            },
            {
              label: "是否机器人",
              prop: "robot",
              search: true,
              span: 8,
              row: true,
              type: 'select',
              formatter: (_row, value)=> {
                return typeMap[value] ||'未知'; //
              },
              dicData: [
                {
                  label: '真人',
                  value: 0,
                },
                {
                  label: '机器人',
                  value: 1,
                },
              ]
            }, {
              label: "是否在线",
              prop: "online",
              span: 8,
              search: true,

              row: true,
              type: 'select',

              formatter: (_row, value)=> {
                return statusRecordMap[value] ||'未知'; //
              },
              dicData: [
                {
                  label: '离线',
                  value: 0,
                },
                {
                  label: '在线',
                  value: 1,
                },
              ]
            }, {
              label: "加入时间",
              prop: "joinTime",
              span: 8,
              row: true
            },
          ]
        }
      };
    },
    computed: {},
    
    methods: {
      onLoad(page, params = {}) {
        this.onLoadRecord();
      },
      sizeChange(pageSize) {
      this.query.pageSize = pageSize;
    },
      searchRecord(params, done) {
        this.query = params;
        this.query.pageNum = 1;
        this.query.pageSize = 10;
        this.onLoad(this.query);
        done()

      },
      searchPageRecord(currentPage, done) {
        this.query.pageNum = currentPage;
        this.onLoadRecord(this.query);
        done()
      },
      onLoadRecord() {
        this.loading = true;
        reqRedpacketRoom(this.query).then(res => {
            console.log(res,"resres");
          const data = res.data.data;
          this.data = data.list;
          this.page.total = data.total;
          this.loading = false;
          // this.selectionClear();
        });
      }
    },
  
  };
  </script>
  
  <style scoped="scoped" lang="scss">
  </style>
  