<template>
  <div class="Costattribution width height bg-f6">
    <div class="bg-ff fl width">
      <div class="Cost-listW Cost-listW-pad fl bg-ff font-167 Cost-listW-div" v-for="(AssetCenterDtoTreeData,index) in AssetCenterDtoTreeDataList">
        <div class=" width fl height-375 bd-btm">
          <img class="Costa-icon-s fl" v-if="AssetCenterDtoTreeData.children.length>0" src="../../assets/img/fill/icon_Level.png" />
          <div class="fr Cost-listW1">
            <div class="fl font-a39 font-167" v-if="AssetCenterDtoTreeData.state == '0' || AssetCenterDtoTreeData.state == 0">{{AssetCenterDtoTreeData.name}}</div>
            <div class="fl font-167" v-if="AssetCenterDtoTreeData.state == '1' || AssetCenterDtoTreeData.state == 1" @click="choosecheckedName(AssetCenterDtoTreeData.name,AssetCenterDtoTreeData.id,AssetCenterDtoTreeData.targetName)">{{AssetCenterDtoTreeData.name}}</div>
            <div class="fr font-F89" @click="cOpen(AssetCenterDtoTreeData.id)" style="padding-right: 1.08333333rem;" v-if="AssetCenterDtoTreeData.children.length>0">
              <img class="Cost-list-img fl" src="../../assets/img/fill/icon_Subordinate.png" />
              <div class="fl open" :id="AssetCenterDtoTreeData.id+'_open'">展开</div>
              <div class="fl open1" :id="AssetCenterDtoTreeData.id+'_close'">收起</div>
            </div>
            <img class="fr Cost-list-line" src="../../assets/img/Q_Modular/line@2x.png"/>
          </div>
          <div class="fl height-375 bg-ff bd-top width costHide2" :name="AssetCenterDtoTreeData.id+'_children'" v-for="(AssetCenterDtoTreeChildren,index) in  AssetCenterDtoTreeData.children"><!-- style="width: 103.5%;"   Cost-list-list2 -->
            <div class="Cost-listW Cost-listW-pad fl" v-if="AssetCenterDtoTreeChildren.children.length>0">
              <img class="Costa-icon-s fl" v-if="AssetCenterDtoTreeChildren.children.length>0" src="../../assets/img/fill/icon_Level.png" />
              <div class="fl font-a39" ref="titleColor" v-if="AssetCenterDtoTreeChildren.state == '0' || AssetCenterDtoTreeChildren.state == 0">{{AssetCenterDtoTreeChildren.name}}</div>
              <div class="fl" ref="titleColor" v-if="AssetCenterDtoTreeChildren.state == '1' || AssetCenterDtoTreeChildren.state == 1" @click="choosecheckedName(AssetCenterDtoTreeChildren.name,AssetCenterDtoTreeChildren.id,AssetCenterDtoTreeChildren.targetName)">{{AssetCenterDtoTreeChildren.name}}</div>
              <div class="fr font-F89" @click="cOpen(AssetCenterDtoTreeChildren.id)" style="padding-right: 1.08333333rem;" v-if="AssetCenterDtoTreeChildren.children.length>0">
                <img class="Cost-list-img fl" src="../../assets/img/fill/icon_Subordinate.png" />
                <div class="fl open" :id="AssetCenterDtoTreeChildren.id+'_open'">展开</div>
                <div class="fl open1" :id="AssetCenterDtoTreeChildren.id+'_close'">收起</div>
              </div>
              <img class="fr Cost-list-line" src="../../assets/img/Q_Modular/line@2x.png"/>
            </div>
            <div class="Cost-listW Cost-listW-pad fl" v-if="AssetCenterDtoTreeChildren.children.length==0" @click="sureCancel(AssetCenterDtoTreeChildren.id+'_checked',AssetCenterDtoTreeChildren.id,AssetCenterDtoTreeChildren.state,AssetCenterDtoTreeChildren.name,AssetCenterDtoTreeChildren.targetName)">
              <div class="fl font-a39" ref="titleColor" style="margin-left: 1.5rem;" v-if="AssetCenterDtoTreeChildren.state == '0' || AssetCenterDtoTreeChildren.state == 0">{{AssetCenterDtoTreeChildren.name}}</div>
              <div class="fl" ref="titleColor" style="margin-left: 1.5rem;" v-if="AssetCenterDtoTreeChildren.state == '1' || AssetCenterDtoTreeChildren.state == 1">{{AssetCenterDtoTreeChildren.name}}</div>
              <img class="cost-btm-icon pst-abs icon_Selected" :id="AssetCenterDtoTreeChildren.id+'_checked'" v-show="AssetCenterDtoTreeChildren.id == checkedName" src="../../assets/img/fill/icon_Selected.png"/>
            </div>
            <div class="bd-top fl height-375 width costHide3" :name="AssetCenterDtoTreeChildren.id+'_children'" v-for="(AssetCenterDtoTreeChildrens,index) in  AssetCenterDtoTreeChildren.children">
              <div class="fl width bg-ff">
                <div class="cost-last-btm bd-btm pst-rlt">
                  <div class="Cost-listW Cost-listW-pad fl" v-if="AssetCenterDtoTreeChildrens.children.length>0">
                    <img class="Costa-icon-s fl" v-if="AssetCenterDtoTreeChildrens.children.length>0" src="../../assets/img/fill/icon_Level.png" />
                    <div class="fl font-a39" ref="titleColor" v-if="AssetCenterDtoTreeChildrens.state == '0' || AssetCenterDtoTreeChildrens.state == 0">{{AssetCenterDtoTreeChildrens.name}}</div>
                    <div class="fl" ref="titleColor" v-if="AssetCenterDtoTreeChildrens.state == '1' || AssetCenterDtoTreeChildrens.state == 1" @click="choosecheckedName(AssetCenterDtoTreeChildrens.name,AssetCenterDtoTreeChildrens.id,AssetCenterDtoTreeChildrens.targetName)">{{AssetCenterDtoTreeChildrens.name}}</div>
                    <div class="fr font-F89" @click="cOpen(AssetCenterDtoTreeChildrens.id)" style="padding-right: 1.08333333rem;" v-if="AssetCenterDtoTreeChildrens.children.length>0">
                      <img class="Cost-list-img fl" src="../../assets/img/fill/icon_Subordinate.png" />
                      <div class="fl open" :id="AssetCenterDtoTreeChildrens.id+'_open'">展开</div>
                      <div class="fl open1" :id="AssetCenterDtoTreeChildrens.id+'_close'">收起</div>
                    </div>
                    <img class="fr Cost-list-line" src="../../assets/img/Q_Modular/line@2x.png"/>
                  </div>
                  <div class="Cost-listW Cost-listW-pad fl" v-if="AssetCenterDtoTreeChildrens.children.length==0" @click="sureCancel(AssetCenterDtoTreeChildrens.id+'_checked',AssetCenterDtoTreeChildrens.id,AssetCenterDtoTreeChildrens.state,AssetCenterDtoTreeChildrens.name,AssetCenterDtoTreeChildrens.targetName)">
                    <div class="fl font-a39" ref="titleColor" style="margin-left: 1.5rem;" v-if="AssetCenterDtoTreeChildrens.state == '0' || AssetCenterDtoTreeChildrens.state == 0">{{AssetCenterDtoTreeChildrens.name}}</div>
                    <div class="fl" ref="titleColor" style="margin-left: 1.5rem;" v-if="AssetCenterDtoTreeChildrens.state == '1' || AssetCenterDtoTreeChildrens.state == 1">{{AssetCenterDtoTreeChildrens.name}}</div>
                    <img class="cost-btm-icon pst-abs icon_Selected" :id="AssetCenterDtoTreeChildrens.id+'_checked'" v-show="AssetCenterDtoTreeChildrens.id == checkedName" src="../../assets/img/fill/icon_Selected.png"/>
                  </div>
                  <div class="bd-top fl height-375 width costHide4" :name="AssetCenterDtoTreeChildrens.id+'_children'" v-for="(AssetCenterDtoTreeChildrens4,index) in  AssetCenterDtoTreeChildrens.children">
                    <div class="fl width bg-ff">
                      <div class="cost-last-btm bd-btm pst-rlt">
                        <div class="Cost-listW Cost-listW-pad fl" v-if="AssetCenterDtoTreeChildrens4.children.length>0">
                          <img class="Costa-icon-s fl" v-if="AssetCenterDtoTreeChildrens4.children.length>0" src="../../assets/img/fill/icon_Level.png" />
                          <div class="fl font-a39" ref="titleColor" v-if="AssetCenterDtoTreeChildrens4.state == '0' || AssetCenterDtoTreeChildrens4.state == 0">{{AssetCenterDtoTreeChildrens4.name}}</div>
                          <div class="fl" ref="titleColor" v-if="AssetCenterDtoTreeChildrens4.state == '1' || AssetCenterDtoTreeChildrens4.state == 1" @click="choosecheckedName(AssetCenterDtoTreeChildrens4.name,AssetCenterDtoTreeChildrens4.id,AssetCenterDtoTreeChildrens4.targetName)">{{AssetCenterDtoTreeChildrens4.name}}</div>
                          <div class="fr font-F89" @click="cOpen(AssetCenterDtoTreeChildrens4.id)" style="padding-right: 1.08333333rem;" v-if="AssetCenterDtoTreeChildrens4.children.length>0">
                            <img class="Cost-list-img fl" src="../../assets/img/fill/icon_Subordinate.png" />
                            <div class="fl open" :id="AssetCenterDtoTreeChildrens4.id+'_open'">展开</div>
                            <div class="fl open1" :id="AssetCenterDtoTreeChildrens4.id+'_close'">收起</div>
                          </div>
                          <img class="fr Cost-list-line" src="../../assets/img/Q_Modular/line@2x.png"/>
                        </div>
                        <div class="Cost-listW Cost-listW-pad fl" v-if="AssetCenterDtoTreeChildrens4.children.length==0" @click="sureCancel(AssetCenterDtoTreeChildrens4.id+'_checked',AssetCenterDtoTreeChildrens4.id,AssetCenterDtoTreeChildrens4.state,AssetCenterDtoTreeChildrens4.name,AssetCenterDtoTreeChildrens4.targetName)">
                          <div class="fl font-a39" ref="titleColor" style="margin-left: 1.5rem;" v-if="AssetCenterDtoTreeChildrens4.state == '0' || AssetCenterDtoTreeChildrens4.state == 0">{{AssetCenterDtoTreeChildrens4.name}}</div>
                          <div class="fl" ref="titleColor" style="margin-left: 1.5rem;" v-if="AssetCenterDtoTreeChildrens4.state == '1' || AssetCenterDtoTreeChildrens4.state == 1">{{AssetCenterDtoTreeChildrens4.name}}</div>
                          <img class="cost-btm-icon pst-abs icon_Selected" :id="AssetCenterDtoTreeChildrens4.id+'_checked'" v-show="AssetCenterDtoTreeChildrens4.id == checkedName" src="../../assets/img/fill/icon_Selected.png"/>
                        </div>
                        <div class="bd-top fl height-375 width costHide5" :name="AssetCenterDtoTreeChildrens4.id+'_children'" v-for="(AssetCenterDtoTreeChildrens5,index) in  AssetCenterDtoTreeChildrens4.children">
                          <div class="fl width bg-ff">
                            <div class="cost-last-btm bd-btm pst-rlt">
                              <div class="Cost-listW Cost-listW-pad fl" v-if="AssetCenterDtoTreeChildrens5.children.length>0">
                                <img class="Costa-icon-s fl" v-if="AssetCenterDtoTreeChildrens5.children.length>0" src="../../assets/img/fill/icon_Level.png" />
                                <div class="fl font-a39" ref="titleColor" v-if="AssetCenterDtoTreeChildrens5.state == '0' || AssetCenterDtoTreeChildrens5.state == 0">{{AssetCenterDtoTreeChildrens5.name}}</div>
                                <div class="fl" ref="titleColor" v-if="AssetCenterDtoTreeChildrens5.state == '1' || AssetCenterDtoTreeChildrens5.state == 1" @click="choosecheckedName(AssetCenterDtoTreeChildrens5.name,AssetCenterDtoTreeChildrens5.id,AssetCenterDtoTreeChildrens5.targetName)">{{AssetCenterDtoTreeChildrens5.name}}</div>
                                <div class="fr font-F89" @click="cOpen(AssetCenterDtoTreeChildrens5.id)" style="padding-right: 1.08333333rem;" v-if="AssetCenterDtoTreeChildrens5.children.length>0">
                                  <img class="Cost-list-img fl" src="../../assets/img/fill/icon_Subordinate.png" />
                                  <div class="fl open" :id="AssetCenterDtoTreeChildrens5.id+'_open'">展开</div>
                                  <div class="fl open1" :id="AssetCenterDtoTreeChildrens5.id+'_close'">收起</div>
                                </div>
                                <img class="fr Cost-list-line" src="../../assets/img/Q_Modular/line@2x.png"/>
                              </div>
                              <div class="Cost-listW Cost-listW-pad fl" v-if="AssetCenterDtoTreeChildrens5.children.length==0" @click="sureCancel(AssetCenterDtoTreeChildrens5.id+'_checked',AssetCenterDtoTreeChildrens5.id,AssetCenterDtoTreeChildrens5.state,AssetCenterDtoTreeChildrens5.name,AssetCenterDtoTreeChildrens5.targetName)">
                                <div class="fl font-a39" ref="titleColor" style="margin-left: 1.5rem;" v-if="AssetCenterDtoTreeChildrens5.state == '0' || AssetCenterDtoTreeChildrens5.state == 0">{{AssetCenterDtoTreeChildrens5.name}}</div>
                                <div class="fl" ref="titleColor" style="margin-left: 1.5rem;" v-if="AssetCenterDtoTreeChildrens5.state == '1' || AssetCenterDtoTreeChildrens5.state == 1">{{AssetCenterDtoTreeChildrens5.name}}</div>
                                <img class="cost-btm-icon pst-abs icon_Selected" :id="AssetCenterDtoTreeChildrens5.id+'_checked'" v-show="AssetCenterDtoTreeChildrens5.id == checkedName" src="../../assets/img/fill/icon_Selected.png"/>
                              </div>
                              <div class="bd-top fl height-375 width costHide6" :name="AssetCenterDtoTreeChildrens5.id+'_children'" v-for="(AssetCenterDtoTreeChildrens6,index) in  AssetCenterDtoTreeChildrens5.children">
                                <div class="fl width bg-ff">
                                  <div class="cost-last-btm bd-btm pst-rlt">
                                    <div class="Cost-listW Cost-listW-pad fl" v-if="AssetCenterDtoTreeChildrens6.children.length>0">
                                      <img class="Costa-icon-s fl" v-if="AssetCenterDtoTreeChildrens6.children.length>0" src="../../assets/img/fill/icon_Level.png" />
                                      <div class="fl font-a39" ref="titleColor" v-if="AssetCenterDtoTreeChildrens6.state == '0' || AssetCenterDtoTreeChildrens6.state == 0">{{AssetCenterDtoTreeChildrens6.name}}</div>
                                      <div class="fl" ref="titleColor" v-if="AssetCenterDtoTreeChildrens6.state == '1' || AssetCenterDtoTreeChildrens6.state == 1" @click="choosecheckedName(AssetCenterDtoTreeChildrens6.name,AssetCenterDtoTreeChildrens6.id,AssetCenterDtoTreeChildrens6.targetName)">{{AssetCenterDtoTreeChildrens6.name}}</div>
                                      <div class="fr font-F89" @click="cOpen(AssetCenterDtoTreeChildrens6.id)" style="padding-right: 1.08333333rem;" v-if="AssetCenterDtoTreeChildrens6.children.length>0">
                                        <img class="Cost-list-img fl" src="../../assets/img/fill/icon_Subordinate.png" />
                                        <div class="fl open" :id="AssetCenterDtoTreeChildrens6.id+'_open'">展开</div>
                                        <div class="fl open1" :id="AssetCenterDtoTreeChildrens6.id+'_close'">收起</div>
                                      </div>
                                      <img class="fr Cost-list-line" src="../../assets/img/Q_Modular/line@2x.png"/>
                                    </div>
                                    <div class="Cost-listW Cost-listW-pad fl" v-if="AssetCenterDtoTreeChildrens6.children.length==0" @click="sureCancel(AssetCenterDtoTreeChildrens6.id+'_checked',AssetCenterDtoTreeChildrens6.id,AssetCenterDtoTreeChildrens6.state,AssetCenterDtoTreeChildrens6.name,AssetCenterDtoTreeChildrens6.targetName)">
                                      <div class="fl font-a39" ref="titleColor" style="margin-left: 1.5rem;" v-if="AssetCenterDtoTreeChildrens6.state == '0' || AssetCenterDtoTreeChildrens6.state == 0">{{AssetCenterDtoTreeChildrens6.name}}</div>
                                      <div class="fl" ref="titleColor" style="margin-left: 1.5rem;" v-if="AssetCenterDtoTreeChildrens6.state == '1' || AssetCenterDtoTreeChildrens6.state == 1">{{AssetCenterDtoTreeChildrens6.name}}</div>
                                      <img class="cost-btm-icon pst-abs icon_Selected" :id="AssetCenterDtoTreeChildrens6.id+'_checked'" v-show="AssetCenterDtoTreeChildrens6.id == checkedName" src="../../assets/img/fill/icon_Selected.png"/>
                                    </div>
                                    <div class="bd-top fl height-375 width costHide7" :name="AssetCenterDtoTreeChildrens6.id+'_children'" v-for="(AssetCenterDtoTreeChildrens7,index) in  AssetCenterDtoTreeChildrens6.children">
                                      <div class="fl width bg-ff">
                                        <div class="cost-last-btm bd-btm pst-rlt">
                                          <div class="Cost-listW Cost-listW-pad fl" v-if="AssetCenterDtoTreeChildrens7.children.length>0">
                                            <img class="Costa-icon-s fl" v-if="AssetCenterDtoTreeChildrens7.children.length>0" src="../../assets/img/fill/icon_Level.png" />
                                            <div class="fl font-a39" ref="titleColor" v-if="AssetCenterDtoTreeChildrens7.state == '0' || AssetCenterDtoTreeChildrens7.state == 0">{{AssetCenterDtoTreeChildrens7.name}}</div>
                                            <div class="fl" ref="titleColor" v-if="AssetCenterDtoTreeChildrens7.state == '1' || AssetCenterDtoTreeChildrens7.state == 1" @click="choosecheckedName(AssetCenterDtoTreeChildrens7.name,AssetCenterDtoTreeChildrens7.id,AssetCenterDtoTreeChildrens7.targetName)">{{AssetCenterDtoTreeChildrens7.name}}</div>
                                            <div class="fr font-F89" @click="cOpen(AssetCenterDtoTreeChildrens7.id)" style="padding-right: 1.08333333rem;" v-if="AssetCenterDtoTreeChildrens7.children.length>0">
                                              <img class="Cost-list-img fl" src="../../assets/img/fill/icon_Subordinate.png" />
                                              <div class="fl open" :id="AssetCenterDtoTreeChildrens7.id+'_open'">展开</div>
                                              <div class="fl open1" :id="AssetCenterDtoTreeChildrens7.id+'_close'">收起</div>
                                            </div>
                                            <img class="fr Cost-list-line" src="../../assets/img/Q_Modular/line@2x.png"/>
                                          </div>
                                          <div class="Cost-listW Cost-listW-pad fl" v-if="AssetCenterDtoTreeChildrens7.children.length==0" @click="sureCancel(AssetCenterDtoTreeChildrens7.id+'_checked',AssetCenterDtoTreeChildrens7.id,AssetCenterDtoTreeChildrens7.state,AssetCenterDtoTreeChildrens7.name,AssetCenterDtoTreeChildrens7.targetName)">
                                            <div class="fl font-a39" ref="titleColor" style="margin-left: 1.5rem;" v-if="AssetCenterDtoTreeChildrens7.state == '0' || AssetCenterDtoTreeChildrens7.state == 0">{{AssetCenterDtoTreeChildrens7.name}}</div>
                                            <div class="fl" ref="titleColor" style="margin-left: 1.5rem;" v-if="AssetCenterDtoTreeChildrens7.state == '1' || AssetCenterDtoTreeChildrens7.state == 1">{{AssetCenterDtoTreeChildrens7.name}}</div>
                                            <img class="cost-btm-icon pst-abs icon_Selected" :id="AssetCenterDtoTreeChildrens7.id+'_checked'" v-show="AssetCenterDtoTreeChildrens7.id == checkedName" src="../../assets/img/fill/icon_Selected.png"/>
                                          </div>
                                          <div class="bd-top fl height-375 width costHide8" :name="AssetCenterDtoTreeChildrens7.id+'_children'" v-for="(AssetCenterDtoTreeChildrens8,index) in  AssetCenterDtoTreeChildrens7.children">
                                            <div class="fl width bg-ff">
                                              <div class="cost-last-btm bd-btm pst-rlt">
                                                <div class="Cost-listW Cost-listW-pad fl" v-if="AssetCenterDtoTreeChildrens8.children.length>0">
                                                  <img class="Costa-icon-s fl" v-if="AssetCenterDtoTreeChildrens8.children.length>0" src="../../assets/img/fill/icon_Level.png" />
                                                  <div class="fl font-a39" ref="titleColor" v-if="AssetCenterDtoTreeChildrens8.state == '0' || AssetCenterDtoTreeChildrens8.state == 0">{{AssetCenterDtoTreeChildrens8.name}}</div>
                                                  <div class="fl" ref="titleColor" v-if="AssetCenterDtoTreeChildrens8.state == '1' || AssetCenterDtoTreeChildrens8.state == 1" @click="choosecheckedName(AssetCenterDtoTreeChildrens8.name,AssetCenterDtoTreeChildrens8.id,AssetCenterDtoTreeChildrens8.targetName)">{{AssetCenterDtoTreeChildrens8.name}}</div>
                                                  <div class="fr font-F89" @click="cOpen(AssetCenterDtoTreeChildrens7.id)" style="padding-right: 1.08333333rem;" v-if="AssetCenterDtoTreeChildrens8.children.length>0">
                                                    <img class="Cost-list-img fl" src="../../assets/img/fill/icon_Subordinate.png" />
                                                    <div class="fl open" :id="AssetCenterDtoTreeChildrens8.id+'_open'">展开</div>
                                                    <div class="fl open1" :id="AssetCenterDtoTreeChildrens8.id+'_close'">收起</div>
                                                  </div>
                                                  <img class="fr Cost-list-line" src="../../assets/img/Q_Modular/line@2x.png"/>
                                                </div>
                                                <div class="Cost-listW Cost-listW-pad fl" v-if="AssetCenterDtoTreeChildrens8.children.length==0" @click="sureCancel(AssetCenterDtoTreeChildrens8.id+'_checked',AssetCenterDtoTreeChildrens8.id,AssetCenterDtoTreeChildrens8.state,AssetCenterDtoTreeChildrens8.name,AssetCenterDtoTreeChildrens8.targetName)">
                                                  <div class="fl font-a39" ref="titleColor" style="margin-left: 1.5rem;" v-if="AssetCenterDtoTreeChildrens8.state == '0' || AssetCenterDtoTreeChildrens8.state == 0">{{AssetCenterDtoTreeChildrens8.name}}</div>
                                                  <div class="fl" ref="titleColor" style="margin-left: 1.5rem;" v-if="AssetCenterDtoTreeChildrens8.state == '1' || AssetCenterDtoTreeChildrens8.state == 1">{{AssetCenterDtoTreeChildrens8.name}}</div>
                                                  <img class="cost-btm-icon pst-abs icon_Selected" :id="AssetCenterDtoTreeChildrens8.id+'_checked'" v-show="AssetCenterDtoTreeChildrens8.id == checkedName" src="../../assets/img/fill/icon_Selected.png"/>
                                                </div>
                                                <div class="bd-top fl height-375 width costHide9" :name="AssetCenterDtoTreeChildrens8.id+'_children'" v-for="(AssetCenterDtoTreeChildrens9,index) in  AssetCenterDtoTreeChildrens8.children">
                                                  <div class="fl width bg-ff">
                                                    <div class="cost-last-btm bd-btm pst-rlt">
                                                      <div class="Cost-listW Cost-listW-pad fl" v-if="AssetCenterDtoTreeChildrens9.children.length>0">
                                                        <img class="Costa-icon-s fl" v-if="AssetCenterDtoTreeChildrens9.children.length>0" src="../../assets/img/fill/icon_Level.png" />
                                                        <div class="fl font-a39" ref="titleColor" v-if="AssetCenterDtoTreeChildrens9.state == '0' || AssetCenterDtoTreeChildrens9.state == 0">{{AssetCenterDtoTreeChildrens9.name}}</div>
                                                        <div class="fl" ref="titleColor" v-if="AssetCenterDtoTreeChildrens9.state == '1' || AssetCenterDtoTreeChildrens9.state == 1" @click="choosecheckedName(AssetCenterDtoTreeChildrens9.name,AssetCenterDtoTreeChildrens9.id,AssetCenterDtoTreeChildrens9.targetName)">{{AssetCenterDtoTreeChildrens9.name}}</div>
                                                        <div class="fr font-F89" @click="cOpen(AssetCenterDtoTreeChildrens9.id)" style="padding-right: 1.08333333rem;" v-if="AssetCenterDtoTreeChildrens9.children.length>0">
                                                          <img class="Cost-list-img fl" src="../../assets/img/fill/icon_Subordinate.png" />
                                                          <div class="fl open" :id="AssetCenterDtoTreeChildrens9.id+'_open'">展开</div>
                                                          <div class="fl open1" :id="AssetCenterDtoTreeChildrens9.id+'_close'">收起</div>
                                                        </div>
                                                        <img class="fr Cost-list-line" src="../../assets/img/Q_Modular/line@2x.png"/>
                                                      </div>
                                                      <div class="Cost-listW Cost-listW-pad fl" v-if="AssetCenterDtoTreeChildrens9.children.length==0" @click="sureCancel(AssetCenterDtoTreeChildrens9.id+'_checked',AssetCenterDtoTreeChildrens9.id,AssetCenterDtoTreeChildrens9.state,AssetCenterDtoTreeChildrens9.name,AssetCenterDtoTreeChildrens9.targetName)">
                                                        <div class="fl font-a39" ref="titleColor" style="margin-left: 1.5rem;" v-if="AssetCenterDtoTreeChildrens9.state == '0' || AssetCenterDtoTreeChildrens9.state == 0">{{AssetCenterDtoTreeChildrens9.name}}</div>
                                                        <div class="fl" ref="titleColor" style="margin-left: 1.5rem;" v-if="AssetCenterDtoTreeChildrens9.state == '1' || AssetCenterDtoTreeChildrens9.state == 1">{{AssetCenterDtoTreeChildrens9.name}}</div>
                                                        <img class="cost-btm-icon pst-abs icon_Selected" :id="AssetCenterDtoTreeChildrens9.id+'_checked'" v-show="AssetCenterDtoTreeChildrens9.id == checkedName" src="../../assets/img/fill/icon_Selected.png"/>
                                                      </div>
                                                      <div class="bd-top fl height-375 width costHide10" :name="AssetCenterDtoTreeChildrens9.id+'_children'" v-for="(AssetCenterDtoTreeChildrens10,index) in  AssetCenterDtoTreeChildrens9.children">
                                                        <div class="fl width bg-ff">
                                                          <div class="cost-last-btm bd-btm pst-rlt">
                                                            <div class="Cost-listW Cost-listW-pad fl" v-if="AssetCenterDtoTreeChildrens10.children.length>0">
                                                              <img class="Costa-icon-s fl" v-if="AssetCenterDtoTreeChildrens10.children.length>0" src="../../assets/img/fill/icon_Level.png" />
                                                              <div class="fl font-a39" ref="titleColor" v-if="AssetCenterDtoTreeChildrens10.state == '0' || AssetCenterDtoTreeChildrens10.state == 0">{{AssetCenterDtoTreeChildrens10.name}}</div>
                                                              <div class="fl" ref="titleColor" v-if="AssetCenterDtoTreeChildrens10.state == '1' || AssetCenterDtoTreeChildrens10.state == 1" @click="choosecheckedName(AssetCenterDtoTreeChildrens10.name,AssetCenterDtoTreeChildrens10.id,AssetCenterDtoTreeChildrens10.targetName)">{{AssetCenterDtoTreeChildrens10.name}}</div>
                                                              <div class="fr font-F89" @click="cOpen(AssetCenterDtoTreeChildrens10.id)" style="padding-right: 1.08333333rem;" v-if="AssetCenterDtoTreeChildrens10.children.length>0">
                                                                <img class="Cost-list-img fl" src="../../assets/img/fill/icon_Subordinate.png" />
                                                                <div class="fl open" :id="AssetCenterDtoTreeChildrens10.id+'_open'">展开</div>
                                                                <div class="fl open1" :id="AssetCenterDtoTreeChildrens10.id+'_close'">收起</div>
                                                              </div>
                                                              <img class="fr Cost-list-line" src="../../assets/img/Q_Modular/line@2x.png"/>
                                                            </div>
                                                            <div class="Cost-listW Cost-listW-pad fl" v-if="AssetCenterDtoTreeChildrens10.children.length==0" @click="sureCancel(AssetCenterDtoTreeChildrens10.id+'_checked',AssetCenterDtoTreeChildrens10.id,AssetCenterDtoTreeChildrens10.state,AssetCenterDtoTreeChildrens10.name,AssetCenterDtoTreeChildrens10.targetName)">
                                                              <div class="fl font-a39" ref="titleColor" style="margin-left: 1.5rem;" v-if="AssetCenterDtoTreeChildrens10.state == '0' || AssetCenterDtoTreeChildrens10.state == 0">{{AssetCenterDtoTreeChildrens10.name}}</div>
                                                              <div class="fl" ref="titleColor" style="margin-left: 1.5rem;" v-if="AssetCenterDtoTreeChildrens10.state == '1' || AssetCenterDtoTreeChildrens10.state == 1">{{AssetCenterDtoTreeChildrens10.name}}</div>
                                                              <img class="cost-btm-icon pst-abs icon_Selected" :id="AssetCenterDtoTreeChildrens10.id+'_checked'" v-show="AssetCenterDtoTreeChildrens10.name == checkedName" src="../../assets/img/fill/icon_Selected.png"/>
                                                            </div>

                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
  import {findAssetCenterDtoTree} from "@/api/user/loginReg";//成本中心查询关联公司列表
  export default {
    data() {
      return {
        open:true,
        open1:true,
        costHide:false,/*第2层*/
        costHide2:false,/*第3层*/
        costCheck:true,/**/
        companyId:"",
        tabList:[],
        checkedName:"",
        causeValue:"",
        price:"0.00",
        dtlList:[],
        AssetCenterDtoTreeDataList: [
          {
            id:'1077118300969082881',
            code:"AC0021",
            name:"测试资产中心1",
            level:0,
            targetName:"ABC资产公司",
            state:'0',
            children:[
              {
                id:'1077118301489176577',
                code:"AC0022",
                name:"子资产中心1",
                level:1,
                parentCode:"AC0021",
                targetName:"ABC资产公司-A部门",
                children:[
                  {
                    id:'1077118307573062659',
                    code:"AC0025",
                    name:"子资产中心1-1",
                    level:2,
                    parentCode:"AC0022",
                    targetName:"ABC资产公司-A部门-1",
                    children:[]
                  }
                ]
              },
              {
                id:'1077118301531119618',
                code:"AC0023",
                name:"子资产中心2",
                level:1,
                parentCode:"AC0021",
                targetName:"ABC资产公司-B部门",
                children:[
                  {
                    id:'1077118309673062658',
                    code:"AC0026",
                    name:"子资产中心2-1",
                    level:2,
                    parentCode:"AC0023",
                    targetName:"ABC资产公司-B部门-1",
                    children:[]
                  }
                ]
              },
              {
                id:'1077118301573062657',
                code:"AC0024",
                name:"子资产中心3",
                level:1,
                parentCode:"AC0021",
                targetName:"ABC资产公司-C部门",
                children:[
                  {
                    id:'1077118303240811394',
                    code:"AC0027",
                    name:"子资产中心3-1",
                    level:2,
                    parentCode:"AC0024",
                    targetName:"ABC资产公司-C部门-1",
                    children:[
                      {
                        id:'1077118301617511395',
                        code:"AC0028",
                        name:"子资产中心3-1-1",
                        level:3,
                        parentCode:"AC0027",
                        targetName:"ABC资产公司-C部门-1-1",
                        children:[

                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
      }
    },
    methods: {
        init(){
            if(this.$route.params.checkedName!=undefined && this.$route.params.checkedName!=null && this.$route.params.checkedName!='null' && this.$route.params.checkedName!=""){
                this.checkedName = this.$route.params.checkedName;
            }else{
                this.checkedName = "";
            }
          if(this.$route.params.price!=undefined && this.$route.params.price!=null && this.$route.params.price!='null' && this.$route.params.price!="undefined"){
            this.price = this.$route.params.price;
            localStorage.setItem('price',this.price);
          }else{
            if(localStorage.getItem('price')!=undefined && localStorage.getItem('price')!="undefined" && localStorage.getItem('price')!=null){
              this.price = localStorage.getItem('price');
            }
          }
          if(this.$route.params.causeValue!=undefined && this.$route.params.causeValue!=null && this.$route.params.causeValue!='null' && this.$route.params.causeValue!="undefined"){
            this.causeValue = this.$route.params.causeValue;
            localStorage.setItem('causeValue',this.causeValue);
          }else{
            if(localStorage.getItem('causeValue')!=undefined && localStorage.getItem('causeValue')!="undefined" && localStorage.getItem('causeValue')!=null){
              this.causeValue = localStorage.getItem('causeValue');
            }
          }
          if(this.$route.params.dtlList!=undefined && this.$route.params.dtlList!=null && this.$route.params.dtlList!='null' && this.$route.params.dtlList!="undefined"){
            this.dtlList = this.$route.params.dtlList;
            localStorage.setItem('dtlList',JSON.stringify(this.dtlList));
          }else{
            if(localStorage.getItem('dtlList')!=undefined && localStorage.getItem('dtlList')!="undefined" && localStorage.getItem('dtlList')!=null){
              this.dtlList=JSON.parse(localStorage.getItem('dtlList'));
            }
          }
          if(this.$route.params.tabList!=undefined && this.$route.params.tabList!=null && this.$route.params.tabList!='null' && this.$route.params.tabList!="undefined"){
            this.tabList = this.$route.params.tabList;
            localStorage.setItem('tabList',JSON.stringify(this.tabList));
          }else{
            if(localStorage.getItem('tabList')!=undefined && localStorage.getItem('tabList')!="undefined" && localStorage.getItem('tabList')!=null){
              this.tabList=JSON.parse(localStorage.getItem('tabList'));
            }
          }
        },
      cOpen(id){
        let childrens = document.getElementsByName(id+'_children');
       if(document.getElementById(id+'_open').style.display==''){
         document.getElementById(id+'_open').style.display = 'none';
         document.getElementById(id+'_close').style.display = 'block';
         for(let i=0;i<childrens.length;i++){
           childrens[i].style.display = 'block';
         }
         //document.getElementById(id+'_children').style.display = 'block';
       }else if(document.getElementById(id+'_open').style.display == 'none'){
         document.getElementById(id+'_open').style.display = 'block';
         document.getElementById(id+'_close').style.display = 'none';
         for(let i=0;i<childrens.length;i++){
           childrens[i].style.display = 'none';
         }
         //document.getElementById(id+'_children').style.display = 'none';
       }else if(document.getElementById(id+'_open').style.display == 'block'){
         document.getElementById(id+'_open').style.display = 'none';
         document.getElementById(id+'_close').style.display = 'block';
         for(let i=0;i<childrens.length;i++){
           childrens[i].style.display = 'block';
         }
         //document.getElementById(id+'_children').style.display = 'block';
       }
      },
      sureCancel(id,checkedId,status,name,targetName){
          if(status == 1 || status == '1'){
            let flag = false;
            if(document.getElementById(id).style.display == 'none'){
              flag = true;
            }else if(document.getElementById(id).style.display == 'block'){
              flag = false;
            }
            let allIconImg = document.getElementsByClassName('icon_Selected');
            for(let i=0;i<allIconImg.length;i++){
              allIconImg[i].style.display ='none';
            }
            if(flag){
              document.getElementById(id).style.display = 'block';
              this.$router.push({name:"Cause",params:{tabList:this.tabList,checkedName:name,checkedId:checkedId,targetName:targetName,price:this.price,causeValue:this.causeValue,dtlList:this.dtlList}})
            }else{
              document.getElementById(id).style.display = 'none';
              this.checkedName = "";
            }
          }
      },
      choosecheckedName(name,id,targetName){
        this.$router.push({name:"cause",params:{tabList:this.tabList,checkedName:name,checkedId:id,targetName:targetName,price:this.price,causeValue:this.causeValue,dtlList:this.dtlList}})
      }
    },
    created(){
      var companyId = localStorage.getItem("companyId");
      findAssetCenterDtoTree(companyId).then(res =>{   //成本中心查询关联公司树
        if(res.data.code == 200){
          this.AssetCenterDtoTreeDataList = res.data.data;
          //console.info(this.AssetCenterDtoTreeDataList);
        }
      },res=>{
        this.error_prompt1="tel-message";
        this.content = res.data.msg;
      })
      this.init();
    }
  }
</script>
<style>
  .Costa-icon-s{
    width: 1.5rem;
    padding-top: 1rem;
  }
  .Cost-listW{
    width: 96.8%;
  }
  .Cost-listW1{
    width:94%;
  }
  .Cost-listW-pad{
    padding-left: 1rem;
  }
  .Cost-list-img{
    width: 1.2rem;
    padding:1.2rem 0.333333rem 0 1rem;
  }
  .Cost-list-line{
    width: 1px;
    padding-top: 1rem;
  }
  .cost-last-btm{
    padding-left: 1.5rem;
  }
  .cost-last-btm:last-child{
    border-bottom:0;
  }
  /*.Cost-list-list2{
    border-bottom: 0;
  }*/
  .cost-btm-icon{
    width: 1.2rem;
    margin-top: 1.5rem;
    right: 1.083rem;
  }
  .cost-last-btm-icon{
    width: 1.2rem;
    top: 1.5rem;
    right: 1.083rem;
  }
  .open1,.costHide2,.costHide3,.costHide4,.costHide3,.costHide5,.costHide6,.costHide7,.costHide8,.costHide9,.costHide10{
    display: none;
  }
</style>

