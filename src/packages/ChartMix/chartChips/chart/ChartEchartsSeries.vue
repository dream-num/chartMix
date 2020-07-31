<template>
  <el-collapse-item name="9" title="系列">
    <!-- 系列设置 -->

    <el-row>
      <el-col :span="1">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="6" class="title">系列设置</el-col>
      <el-col :span="10">
        <el-select size="mini" v-model="seriesValue">
          <el-option :key="i" :label="item" :value="item" v-for="(item , i) in seriesOption"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;">
      <el-col :span="6">类型</el-col>
      <el-col :span="6">
        <el-select size="mini" v-model="type">
          <el-option
            :key="i"
            :label="item.label"
            :value="item.value"
            v-for="(item , i) in typeOption"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div v-show="seriesValue != '通用设置'">
      <el-row style="margin-top: 15px;">
        <el-col :span="6">鼠标提示显示格式</el-col>
        <el-col :span="6">
          <el-select @change="extpFormat" size="mini" v-model="series.tpFormat">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item , i) in tpFormatOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6" class="title">鼠标提示格式</el-col>
        <el-col :span="6">
          <el-select @change="extpFormat" size="mini" v-model="series.tpDigit">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item , i) in valueDigitOption"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select @change="extpFormat" size="mini" v-model="series.tpRatio">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item , i) in valueRatioOption"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input @change="extpFormat" size="mini" v-model="series.tpText"></el-input>
        </el-col>
      </el-row>
    </div>
    <el-row style="margin-top: 15px;">
      <el-col :span="6">Y轴主次坐标</el-col>
      <el-col :span="10">
        <el-radio-group @change="exAxis" size="mini" v-model="series.radio">
          <el-radio-button :label="0">主坐标轴(左侧)</el-radio-button>
          <el-radio-button :label="1">次坐标轴(右侧)</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;" v-show="chart_pro=='echarts'&&chart_type=='column'&&chart_style=='doubleX'">
      <el-col :span="6">X轴主次坐标</el-col>
      <el-col :span="10">
        <el-radio-group @change="exXAxis" size="mini" v-model="series.xradio">
          <el-radio-button :label="0">主坐标轴(下方)</el-radio-button>
          <el-radio-button :label="1">次坐标轴(上侧)</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="3">
        <el-button @click="addLevel">点击增加层级</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;">
      <el-col :span="6">开启轮询</el-col>
      <el-col :span="6">
        <el-switch
          @change="excirculation"
          active-color="#13ce66"
          inactive-color="#d8d8d8"
          v-model="comCirculation.start"
        ></el-switch>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;">
      <el-col :span="6">轮询间隔时间</el-col>
      <el-col :span="6">
        <el-input @change="excirculation" size="mini" v-model="comCirculation.time"></el-input>秒
      </el-col>
    </el-row>
    <!-- 折线图设置 -->
    <div v-show="type == 'line'">
      <el-row style="margin-top: 15px;">
        <el-col :span="4">线条</el-col>
        <el-col :span="5">
          <el-select @change="exlineWidth" size="mini" v-model="series.lineWidth">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item, i) in lineWidthOption"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select @change="exlineType" size="mini" v-model="series.lineType">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item, i) in lineTypeOption"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-checkbox-group @change="exlineStyle" size="mini" v-model="series.lineStyle">
            <el-checkbox-button label="step">阶梯</el-checkbox-button>
            <el-checkbox-button label="smooth">平滑</el-checkbox-button>
          </el-checkbox-group>
        </el-col>
        <el-col :span="2">
          <gradient-picker @change="exlineColor" size="mini" v-model="series.lineColor"></gradient-picker>
        </el-col>
      </el-row>
      <el-row v-show="series.lineWidth == 'custom'">
        <el-col :span="22">
          <div class="input">
            <el-slider
              :show-input-controls="false"
              @change="excusLineWidth"
              input-size="mini"
              show-input
              style="padding-left: 10px;"
              v-model="series.cuslineWidth"
            ></el-slider>
          </div>
        </el-col>
        <el-col :span="1" class="input_content">px</el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6">数据点</el-col>
        <el-col :span="3">
          <el-switch
            @change="exshowSymbol"
            active-color="#13ce66"
            inactive-color="#d8d8d8"
            v-model="series.showSymbol"
          ></el-switch>
        </el-col>
        <el-col :span="5">
          <el-select @change="exsymbolSize" size="mini" v-model="series.symbolSize">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item,i) in symbolSizeOption"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select @change="exsymbol" size="mini" v-model="series.symbol">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item,i) in symbolOption"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <gradient-picker @change="exitemColor" size="mini" v-model="series.itemColor"></gradient-picker>
        </el-col>
      </el-row>
      <el-row v-show="series.symbolSize == 'custom'">
        <el-col :span="22">
          <div class="input">
            <el-slider
              :show-input-controls="false"
              @change="excusSymbolSize"
              input-size="mini"
              show-input
              style="padding-left: 10px;"
              v-model="series.cusSymbolSize"
            ></el-slider>
          </div>
        </el-col>
        <el-col :span="1" class="input_content">px</el-col>
      </el-row>
    </div>
    <!-- 柱状图设置 -->
    <div v-show="type == 'bar' || type == 'pictorialBar'">
      <el-row style="margin-top: 15px;">
        <el-col :span="6">柱状图颜色</el-col>
        <el-col :span="3">
          <gradient-picker @change="exbarColor" size="mini" v-model="series.barColor"></gradient-picker>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6">柱状宽度</el-col>
        <el-col :span="6">
          <el-select @change="exbarWidth" size="mini" v-model="series.barWidth">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item,i) in barWidthOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row v-show="series.barWidth == 'custom'">
        <el-col :span="22">
          <div class="input">
            <el-slider
              :show-input-controls="false"
              @change="excusBarWidth"
              input-size="mini"
              show-input
              style="padding-left: 10px;"
              v-model="series.cusbarWidth"
            ></el-slider>
          </div>
        </el-col>
        <el-col :span="1" class="input_content">px</el-col>
      </el-row>
      <el-row style="margin-top: 15px;" v-show="type == 'bar'">
        <el-col :span="6">柱状图圆角大小</el-col>
        <el-col :span="8">
          <el-select @change="exborderRadius" size="mini" v-model="series.borderRadius">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item , i) in radiusOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <div v-show="series.borderRadius == 'custom'">
        <el-row>
          <el-col :span="22">
            <el-tooltip :open-delay="500" content="滑动修改左上圆角大小" placement="top">
              <el-slider
                :show-input-controls="false"
                @change="excusBorderRadius"
                input-size="mini"
                show-input
                style="padding-left: 10px;"
                v-model="series.radius1"
              ></el-slider>
            </el-tooltip>
          </el-col>
          <el-col :span="1" class="input_content">px</el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-tooltip :open-delay="500" content="滑动修改右上圆角大小" placement="top">
              <el-slider
                :show-input-controls="false"
                @change="excusBorderRadius"
                input-size="mini"
                show-input
                style="padding-left: 10px;"
                v-model="series.radius2"
              ></el-slider>
            </el-tooltip>
          </el-col>
          <el-col :span="1" class="input_content">px</el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-tooltip :open-delay="500" content="滑动修改左下圆角大小" placement="top">
              <el-slider
                :show-input-controls="false"
                @change="excusBorderRadius"
                input-size="mini"
                show-input
                style="padding-left: 10px;"
                v-model="series.radius3"
              ></el-slider>
            </el-tooltip>
          </el-col>
          <el-col :span="1" class="input_content">px</el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-tooltip :open-delay="500" content="滑动修改右下圆角大小" placement="top">
              <el-slider
                :show-input-controls="false"
                @change="excusBorderRadius"
                input-size="mini"
                show-input
                style="padding-left: 10px;"
                v-model="series.radius4"
              ></el-slider>
            </el-tooltip>
          </el-col>
          <el-col :span="1" class="input_content">px</el-col>
        </el-row>
      </div>
      <el-row style="margin-top: 15px;" v-show="type == 'pictorialBar'">
        <el-col :span="6">柱状图形状</el-col>
        <el-col :span="6">
          <el-select @change="exsymbol1" size="mini" v-model="series.symbol1">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item,i) in symbolOption1"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6">柱条最小高度</el-col>
        <el-col :span="6">
          <el-select @change="exbarMinHeight" size="mini" v-model="series.barMinHeight">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item,i) in barMinHeightOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row v-show="series.barMinHeight == 'custom'">
        <el-col :span="22">
          <div class="input">
            <el-slider
              :show-input-controls="false"
              @change="excusBarMinHeight"
              input-size="mini"
              show-input
              style="padding-left: 10px;"
              v-model="series.cusbarMinHeight"
            ></el-slider>
          </div>
        </el-col>
        <el-col :span="1" class="input_content">px</el-col>
      </el-row>
      <el-row style="margin-top: 15px;" v-show="!chart_style.includes('stack')">
        <el-col :span="8">不同系列的柱间距离</el-col>
        <el-col :span="6">
          <el-select @change="exbarGap" size="mini" v-model="series.barGap">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item,i) in barGapOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row v-show="series.barGap == 'custom'">
        <el-col :span="22">
          <div class="input">
            <el-slider
              :min="-100"
              :show-input-controls="false"
              @change="excusBarGap"
              input-size="mini"
              show-input
              style="padding-left: 10px;"
              v-model="series.cusbarGap"
            ></el-slider>
          </div>
        </el-col>
        <el-col :span="1" class="input_content">%</el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="8">相同系列的柱间距离</el-col>
        <el-col :span="6">
          <el-select @change="exbarCategoryGap" size="mini" v-model="series.barCategoryGap">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item,i) in barCategoryGapOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row v-show="series.barCategoryGap == 'custom'">
        <el-col :span="22">
          <div class="input">
            <el-slider
              :min="-100"
              :show-input-controls="false"
              @change="excusbarCategoryGap"
              input-size="mini"
              show-input
              style="padding-left: 10px;"
              v-model="series.cusbarCategoryGap"
            ></el-slider>
          </div>
        </el-col>
        <el-col :span="1" class="input_content">%</el-col>
      </el-row>
    </div>
    <!-- 数据标签 -->
    <el-row style="margin-top: 15px;">
      <el-col :span="1">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="6" class="title">显示数据标签</el-col>
      <el-col :span="17">
        <el-switch
          @change="exshowLabel"
          active-color="#13ce66"
          inactive-color="#d8d8d8"
          v-model="series.showLabel"
        ></el-switch>
      </el-col>
    </el-row>
    <div v-show="series.showLabel">
      <el-row style="margin-top: 15px;">
        <el-col :span="6">标签显示格式</el-col>
        <el-col :span="10">
          <el-select @change="exformatter" size="mini" v-model="series.formatter">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item , i) in formatterOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6" class="title">小数位数</el-col>
        <el-col :span="6">
          <el-select @change="exvalueDigit" size="mini" v-model="series.valueDigit">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item , i) in valueDigitOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6" class="title">数值比例</el-col>
        <el-col :span="6">
          <el-select @change="exvalueRatio" size="mini" v-model="series.valueRatio">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item , i) in valueRatioOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6" class="title">标签前缀</el-col>
        <el-col :span="18">
          <el-input @change="exprefixVal" size="mini" v-model="series.prefixVal"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6" class="title">标签后缀</el-col>
        <el-col :span="18">
          <el-input @change="exsuffixVal" size="mini" v-model="series.suffixVal"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="5">
          <el-tooltip :open-delay="500" content="标签位置" placement="top">
            <el-select @change="extextPos" size="mini" v-model="series.textPos">
              <el-option
                :key="i"
                :label="item.label"
                :value="item.value"
                v-for="(item , i) in textPosOption"
              ></el-option>
            </el-select>
          </el-tooltip>
        </el-col>
        <el-col :span="5">
          <el-checkbox-group @change="exfontPlace" size="mini" v-model="series.fontPlace">
            <el-checkbox-button label="bold">B</el-checkbox-button>
            <el-checkbox-button label="italic" style="fontStyle: italic;">I</el-checkbox-button>
          </el-checkbox-group>
        </el-col>
        <el-col :span="5">
          <el-select @change="exfontSize" size="mini" v-model="series.fontSize">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item , i) in fontSizeOption"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <gradient-picker :label="true" @change="exfzColor" size="mini" v-model="series.fzColor"></gradient-picker>
        </el-col>
      </el-row>
      <div v-show="series.textPos == 'custom'">
        <el-row>
          <el-col :span="22">
            <el-tooltip :open-delay="500" content="滑动修改水平距离" placement="top">
              <el-slider
                :max="500"
                :min="-200"
                :show-input-controls="false"
                @change="exoffset"
                input-size="mini"
                show-input
                style="padding-left: 10px;"
                v-model="series.offsetX"
              ></el-slider>
            </el-tooltip>
          </el-col>
          <el-col :span="1" class="input_content">%</el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-tooltip :open-delay="500" content="滑动修改垂直距离" placement="top">
              <el-slider
                :max="200"
                :min="-200"
                :show-input-controls="false"
                @change="exoffset"
                input-size="mini"
                show-input
                style="padding-left: 10px;"
                v-model="series.offsetY"
              ></el-slider>
            </el-tooltip>
          </el-col>
          <el-col :span="1" class="input_content">%</el-col>
        </el-row>
      </div>
      <el-row v-if="series.fontSize == 'custom'">
        <el-col :span="22">
          <div class="input">
            <el-tooltip :open-delay="500" content="滑动修改字体大小" placement="top">
              <el-slider
                :show-input-controls="false"
                @change="excustomSize"
                input-size="mini"
                show-input
                style="padding-left: 10px;"
                v-model="series.customSize"
              ></el-slider>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="1" class="input_content">px</el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6">文字对齐方式</el-col>
        <el-col :span="5">
          <el-tooltip :open-delay="500" content="文字水平对齐方式" placement="top">
            <el-select @change="exalign" size="mini" v-model="series.align">
              <el-option
                :key="i"
                :label="item.label"
                :value="item.value"
                v-for="(item , i) in alignOption"
              ></el-option>
            </el-select>
          </el-tooltip>
        </el-col>
        <el-col :span="5">
          <el-tooltip :open-delay="500" content="文字垂直对齐方式" placement="top">
            <el-select @change="exverticalAlign" size="mini" v-model="series.verticalAlign">
              <el-option
                :key="i"
                :label="item.label"
                :value="item.value"
                v-for="(item , i) in verticalAlignOption"
              ></el-option>
            </el-select>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row v-show="series.verticalAlign == 'custom'">
        <el-col :span="22">
          <div class="input">
            <el-slider
              :min="-100"
              :show-input-controls="false"
              @change="excusAlign"
              input-size="mini"
              show-input
              style="padding-left: 10px;"
              v-model="series.cusAlignX"
            ></el-slider>
          </div>
        </el-col>
        <el-col :span="1" class="input_content">px</el-col>
      </el-row>
      <el-row v-show="series.verticalAlign == 'custom'">
        <el-col :span="22">
          <div class="input">
            <el-slider
              :min="-100"
              :show-input-controls="false"
              @change="excusAlign"
              input-size="mini"
              show-input
              style="padding-left: 10px;"
              v-model="series.cusAlignY"
            ></el-slider>
          </div>
        </el-col>
        <el-col :span="1" class="input_content">px</el-col>
      </el-row>
    </div>
    <!-- 堆叠图 -->
    <div v-show="chart_style != 'costComposition' && type != 'pictorialBar'">
      <el-row style="margin-top: 15px;">
        <el-col :span="1">
          <i class="el-icon-menu"></i>
        </el-col>
        <el-col :span="6" class="title">设置为堆叠图</el-col>
        <el-col :span="17">
          <el-switch
            @change="exStack"
            active-color="#13ce66"
            inactive-color="#d8d8d8"
            v-model="series.showStack"
          ></el-switch>
        </el-col>
      </el-row>
      <div v-show="series.showStack">
        <el-row style="margin-top: 15px;">
          <el-col :span="6" class="title">堆叠名称</el-col>
          <el-col :span="17">
            <el-input @change="exstackValue" size="mini" v-model="series.stackValue"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top: 15px;" v-show="type == 'bar'">
          <el-col :span="6" class="title">类目间柱形距离</el-col>
          <el-select @change="exbarCategoryGap " size="mini" v-model="series.barCategoryGap">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item,i) in barCategoryGapOption"
            ></el-option>
          </el-select>
        </el-row>
        <el-row v-show="series.barCategoryGap == 'custom'">
          <el-col :span="22">
            <div class="input">
              <el-slider
                :min="-100"
                :show-input-controls="false"
                @change="excusBarCategoryGap"
                input-size="mini"
                show-input
                style="padding-left: 10px;"
                v-model="series.cusbarCategoryGap"
              ></el-slider>
            </div>
          </el-col>
          <el-col :span="1" class="input_content">%</el-col>
        </el-row>
      </div>
    </div>
    <div v-show="type == 'line'">
      <el-row style="margin-top: 15px;">
        <el-col :span="1">
          <i class="el-icon-menu"></i>
        </el-col>
        <el-col :span="6" class="title">设置为面积图</el-col>
        <el-col :span="17">
          <el-switch
            @change="exArea"
            active-color="#13ce66"
            inactive-color="#d8d8d8"
            v-model="show"
          ></el-switch>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;" v-show="series.showArea">
        <el-col :span="6" class="title">面积图覆盖颜色</el-col>
        <el-col :span="18">
          <gradient-picker @change="exArea" size="mini" v-model="series.areaColor"></gradient-picker>
        </el-col>
      </el-row>
    </div>
  </el-collapse-item>
</template>

<script>
import * as t from '@/utils/importUtil'

export default {
  data() {
    return {
      totalArr: [],
      series: {
        lineWidth: 2,
        cuslineWidth: 2,
        lineType: "solid",
        lineStyle: [],
        lineColor: null,
        itemColor: null,
        barColor: null,
        symbolSize: 3,
        cusSymbolSize: 3,
        showSymbol: true,
        symbol: "emptyCircle",
        symbol1: "circle",
        barWidth: null,
        cusbarWidth: 0,
        barMinHeight: 0,
        cusbarMinHeight: 0,
        barGap: "30%",
        cusbarGap: 0,
        barCategoryGap: "20%",
        cusbarCategoryGap: 0,
        showLabel: false,
        valueRatio: "1",
        valueDigit: "default",
        prefixVal: "",
        suffixVal: "",
        textPos: "inside",
        offsetX: 0,
        offsetY: 0,
        fontPlace: [],
        fzColor: null,
        fontSize: 10,
        customSize: 0,
        showStack: false,
        showArea: false,
        formatter: "{c}",
        stackValue: "默认类目",
        barCategoryGap: "20%",
        cusbarCategoryGap: 0,
        areaColor: null,
        align: "left",
        verticalAlign: "middle",
        cusAlignX: 0,
        cusAlignY: 0,
        radio: 0,
        xradio: 0,
        z: 2,
        borderRadius: 0,
        radius1: 0,
        radius2: 0,
        radius3: 0,
        radius4: 0,
        tpFormat: "{abc}",
        tpText: "",
        tpRatio: "1",
        tpDigit: "default"
      },
      sindex: 0,
      oseries: {},
      tindex: 0,
      comCirculation: {
        start: false,
        time: "3"
      },
      lineWidthOption: [
        { value: 1, label: "1px" },
        { value: 2, label: "2px" },
        { value: 3, label: "3px" },
        { value: 4, label: "4px" },
        { value: 5, label: "5px" },
        { value: 6, label: "6px" },
        { value: 7, label: "7px" },
        { value: 8, label: "8px" },
        { value: "custom", label: "自定义" }
      ],
      lineTypeOption: [
        { value: "solid", label: "实线" },
        { value: "dashed", label: "虚线" },
        { value: "dotted", label: "点线" }
      ],
      symbolSizeOption: [
        { value: 2, label: "2px" },
        { value: 3, label: "3px" },
        { value: 6, label: "6px" },
        { value: 8, label: "8px" },
        { value: 10, label: "10px" },
        { value: 12, label: "12px" },
        { value: 14, label: "14px" },
        { value: 16, label: "16px" },
        { value: "custom", label: "自定义" }
      ],
      symbolOption: [
        { value: "emptyCircle", label: "空心圆" },
        { value: "circle", label: "圆" },
        { value: "emptyRect", label: "空心矩形" },
        { value: "rect", label: "矩形" },
        { value: "roundRect", label: "圆角矩形" },
        { value: "emptyTriangle", label: "空心三角" },
        { value: "triangle", label: "三角形" },
        { value: "emptyDiamond", label: "空心菱形" },
        { value: "diamond", label: "菱形" },
        { value: "pin", label: "标注" },
        { value: "arrow", label: "箭头" },
        { value: "line", label: "直线" }
      ],
      symbolOption1: [
        { value: "circle", label: "圆" },
        { value: "rect", label: "矩形" },
        { value: "roundRect", label: "圆角矩形" },
        { value: "triangle", label: "三角形" },
        { value: "diamond", label: "菱形" },
        { value: "pin", label: "标注" },
        { value: "arrow", label: "箭头" },
        { value: "none", label: "无" }
      ],
      barWidthOption: [
        { value: null, label: "自适应" },
        { value: 10, label: "窄" },
        { value: 30, label: "一般" },
        { value: 50, label: "宽" },
        { value: "custom", label: "自定义" }
      ],
      barMinHeightOption: [
        { value: 0, label: "默认" },
        { value: 5, label: "矮" },
        { value: 10, label: "一般" },
        { value: 30, label: "高" },
        { value: "custom", label: "自定义" }
      ],
      barGapOption: [
        { value: "30%", label: "默认" },
        { value: "50%", label: "远" },
        { value: "40%", label: "一般" },
        { value: "20%", label: "近" },
        { value: "0%", label: "重叠" },
        { value: "-10%", label: "交错" },
        { value: "custom", label: "自定义" }
      ],
      valueRatioOption: [
        { value: "100", label: "乘以100" },
        { value: "10", label: "乘以10" },
        { value: "1", label: "默认" },
        { value: "0.1", label: "除以10" },
        { value: "0.01", label: "除以100" },
        { value: "0.001", label: "除以1000" },
        { value: "0.0001", label: "除以一万" },
        { value: "0.00001", label: "除以10万" },
        { value: "0.000001", label: "除以一百万" },
        { value: "0.0000001", label: "除以一千万" },
        { value: "0.00000001", label: "除以一亿" },
        { value: "0.000000001", label: "除以十亿" }
      ],
      valueDigitOption: [
        { value: "default", label: "自动显示" },
        { value: 0, label: "整数" },
        { value: 1, label: "1位小数" },
        { value: 2, label: "2位小数" },
        { value: 3, label: "3位小数" },
        { value: 4, label: "4位小数" },
        { value: 5, label: "5位小数" },
        { value: 6, label: "6位小数" },
        { value: 7, label: "7位小数" },
        { value: 8, label: "8位小数" }
      ],
      textPosOption: [
        { value: "top", label: "顶端" },
        { value: "left", label: "左侧" },
        { value: "right", label: "右侧" },
        { value: "bottom", label: "底部" },
        { value: "inside", label: "内部居中" },
        { value: "insideLeft", label: "内部左侧" },
        { value: "insideRight", label: "内部右侧" },
        { value: "insideTop", label: "内部顶端" },
        { value: "insideBottom", label: "内部底部" },
        { value: "insideTopLeft", label: "内部左上" },
        { value: "insideBottomLeft", label: "内部左下" },
        { value: "insideTopRight", label: "内部右上" },
        { value: "insideBottomRight", label: "内部右下" },
        { value: "custom", label: "自定义" }
      ],
      fontSizeOption: [
        { value: 6, label: "6px" },
        { value: 8, label: "8px" },
        { value: 10, label: "10px" },
        { value: 12, label: "12px" },
        { value: 14, label: "14px" },
        { value: 16, label: "16px" },
        { value: 18, label: "18px" },
        { value: 20, label: "20px" },
        { value: 22, label: "22px" },
        { value: 24, label: "24px" },
        { value: 30, label: "30px" },
        { value: 36, label: "36px" },
        { value: "custom", label: "自定义" }
      ],
      alignOption: [
        { value: "left", label: "左对齐" },
        { value: "center", label: "居中对齐" },
        { value: "right", label: "右对齐" }
      ],
      verticalAlignOption: [
        { value: "top", label: "底部对齐" },
        { value: "middle", label: "居中对齐" },
        { value: "bottom", label: "顶部对齐" },
        { value: "custom", label: "自定义" }
      ],
      barCategoryGapOption: [
        { value: "20%", label: "默认" },
        { value: "40%", label: "远" },
        { value: "30%", label: "一般" },
        { value: "10%", label: "近" },
        { value: "custom", label: "自定义" }
      ],
      radiusOption: [
        { value: 0, label: "默认无" },
        { value: "custom", label: "自定义" }
      ],
      tpFormatOption: [
        { value: "{abc}", label: "系列名+数据名+数据" },
        { value: "{bc}", label: "数据名+数据" },
        { value: "{ac}", label: "系列名+数据" }
      ]
    };
  },
  components: {
      ...t.importComp(t)
  },
  computed: {
    totalArr1() {
      if (!this.$store.state.chartSetting.chartCurrent) {
        return;
      }
      var flag = this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].defaultOption.area;
      var series = {
        lineWidth: 2,
        cuslineWidth: 2,
        lineType: "solid",
        lineStyle: [],
        lineColor: null,
        itemColor: null,
        barColor: null,
        symbolSize: 3,
        cusSymbolSize: 3,
        showSymbol: true,
        symbol: "emptyCircle",
        symbol1: "circle",
        barWidth: null,
        cusbarWidth: 0,
        barMinHeight: 0,
        cusbarMinHeight: 0,
        barGap: "30%",
        cusbarGap: 0,
        barCategoryGap: "20%",
        cusbarCategoryGap: 0,
        showLabel: false,
        valueRatio: "1",
        valueDigit: "default",
        prefixVal: "",
        suffixVal: "",
        textPos: "inside",
        offsetX: 0,
        offsetY: 0,
        fontPlace: [],
        fzColor: null,
        fontSize: 10,
        customSize: 0,
        showStack: false,
        showArea: false,
        formatter: "{c}",
        stackValue: "默认类目",
        barCategoryGap: "20%",
        cusbarCategoryGap: 0,
        areaColor: null,
        align: "left",
        verticalAlign: "middle",
        cusAlignX: 0,
        cusAlignY: 0,
        radio: 0,
        xradio: 0,
        z: 2,
        borderRadius: 0,
        radius1: 0,
        radius2: 0,
        radius3: 0,
        radius4: 0,
        tpFormat: "{abc}",
        tpText: "",
        tpRatio: "1",
        tpDigit: "default"
      };
      var arr = [];
      for (var i = 0; i < this.seriesOption.length; i++) {
        var item = "item" + i;
        item = generator.deepCopy(series);
        if (flag) {
          item.showArea = true;
        }
        if (
          (this.chart_type == "line" && this.chart_style == "label") ||
          this.chart_style == "stackRatio"
        ) {
          item.showLabel = true;
        }
        // 如果是堆叠图, 默认showStack为true
        if (this.chart_style.includes("stack")) {
          item.showStack = true;
        }
        arr.push(item);
      }
      return arr;
    },
    chart_id() {
      var chart_id = this.$store.state.chartSetting.chartCurrent;
      if (!chart_id) {
        return;
      }
      this.config = generator.getOptionByRouter(
        this.$store.state.chartSetting,
        {
          router: "series"
        }
      );
      this.oseries = {
        lineWidth: 2,
        cuslineWidth: 2,
        lineType: "solid",
        lineStyle: [],
        lineColor: null,
        itemColor: null,
        barColor: null,
        symbolSize: 3,
        cusSymbolSize: 3,
        showSymbol: true,
        symbol: "emptyCircle",
        symbol1: "circle",
        barWidth: null,
        cusbarWidth: 0,
        barMinHeight: 0,
        cusbarMinHeight: 0,
        barGap: "30%",
        cusbarGap: 0,
        barCategoryGap: "20%",
        cusbarCategoryGap: 0,
        showLabel: false,
        valueRatio: "1",
        valueDigit: "default",
        prefixVal: "",
        suffixVal: "",
        textPos: "inside",
        offsetX: 0,
        offsetY: 0,
        fontPlace: [],
        fzColor: null,
        fontSize: 10,
        customSize: 0,
        showStack: false,
        showArea: false,
        formatter: "{c}",
        stackValue: "默认类目",
        barCategoryGap: "20%",
        cusbarCategoryGap: 0,
        areaColor: null,
        align: "left",
        verticalAlign: "middle",
        cusAlignX: 0,
        cusAlignY: 0,
        radio: 0,
        xradio: 0,
        z: 2,
        borderRadius: 0,
        radius1: 0,
        radius2: 0,
        radius3: 0,
        radius4: 0,
        tpFormat: "{abc}",
        tpText: "",
        tpRatio: "1",
        tpDigit: "default"
      };
      if (
        (this.chart_type == "line" && this.chart_style == "label") ||
        this.chart_style == "stackRatio"
      ) {
        this.oseries = {
          lineWidth: 2,
          cuslineWidth: 2,
          lineType: "solid",
          lineStyle: [],
          lineColor: null,
          itemColor: null,
          barColor: null,
          symbolSize: 3,
          cusSymbolSize: 3,
          showSymbol: true,
          symbol: "emptyCircle",
          symbol1: "circle",
          barWidth: null,
          cusbarWidth: 0,
          barMinHeight: 0,
          cusbarMinHeight: 0,
          barGap: "30%",
          cusbarGap: 0,
          barCategoryGap: "20%",
          cusbarCategoryGap: 0,
          showLabel: true,
          valueRatio: "1",
          valueDigit: "default",
          prefixVal: "",
          suffixVal: "",
          textPos: "inside",
          offsetX: 0,
          offsetY: 0,
          fontPlace: [],
          fzColor: null,
          fontSize: 10,
          customSize: 0,
          showStack: false,
          showArea: false,
          formatter: "{c}",
          stackValue: "默认类目",
          barCategoryGap: "20%",
          cusbarCategoryGap: 0,
          areaColor: null,
          align: "left",
          verticalAlign: "middle",
          cusAlignX: 0,
          cusAlignY: 0,
          radio: 0,
          xradio: 0,
          z: 2,
          borderRadius: 0,
          radius1: 0,
          radius2: 0,
          radius3: 0,
          radius4: 0,
          tpFormat: "{abc}",
          tpText: "",
          tpRatio: "1",
          tpDigit: "default"
        };
      }
      // 如果是堆叠图, 默认showStack为true
      if (this.chart_style.includes("stack")) {
        this.oseries = {
          lineWidth: 2,
          cuslineWidth: 2,
          lineType: "solid",
          lineStyle: [],
          lineColor: null,
          itemColor: null,
          barColor: null,
          symbolSize: 3,
          cusSymbolSize: 3,
          showSymbol: true,
          symbol: "emptyCircle",
          symbol1: "circle",
          barWidth: null,
          cusbarWidth: 0,
          barMinHeight: 0,
          barCategoryGap: "20%",
          cusbarCategoryGap: 0,
          cusbarMinHeight: 0,
          barGap: "30%",
          cusbarGap: 0,
          showLabel: false,
          valueRatio: "1",
          valueDigit: "default",
          prefixVal: "",
          suffixVal: "",
          textPos: "inside",
          offsetX: 0,
          offsetY: 0,
          fontPlace: [],
          fzColor: null,
          fontSize: 10,
          customSize: 0,
          showStack: true,
          showArea: false,
          formatter: "{c}",
          stackValue: "默认类目",
          barCategoryGap: "20%",
          cusbarCategoryGap: 0,
          areaColor: null,
          align: "left",
          verticalAlign: "middle",
          cusAlignX: 0,
          cusAlignY: 0,
          radio: 0,
          xradio: 0,
          z: 2,
          borderRadius: 0,
          radius1: 0,
          radius2: 0,
          radius3: 0,
          radius4: 0,
          tpFormat: "{abc}",
          tpText: "",
          tpRatio: "1",
          tpDigit: "default"
        };
      }
      if (this.chart_style == "stackRatio") {
        this.oseries = {
          lineWidth: 2,
          cuslineWidth: 2,
          lineType: "solid",
          lineStyle: [],
          lineColor: null,
          itemColor: null,
          barColor: null,
          symbolSize: 3,
          cusSymbolSize: 3,
          showSymbol: true,
          symbol: "emptyCircle",
          symbol1: "circle",
          barWidth: null,
          cusbarWidth: 0,
          barMinHeight: 0,
          barCategoryGap: "20%",
          cusbarCategoryGap: 0,
          cusbarMinHeight: 0,
          barGap: "30%",
          cusbarGap: 0,
          showLabel: true,
          valueRatio: "1",
          valueDigit: "default",
          prefixVal: "",
          suffixVal: "",
          textPos: "inside",
          offsetX: 0,
          offsetY: 0,
          fontPlace: [],
          fzColor: null,
          fontSize: 10,
          customSize: 0,
          showStack: true,
          showArea: false,
          formatter: "{c}",
          stackValue: "默认类目",
          barCategoryGap: "20%",
          cusbarCategoryGap: 0,
          areaColor: null,
          align: "left",
          verticalAlign: "middle",
          cusAlignX: 0,
          cusAlignY: 0,
          radio: 0,
          xradio: 0,
          z: 2,
          borderRadius: 0,
          radius1: 0,
          radius2: 0,
          radius3: 0,
          radius4: 0,
          tpFormat: "{abc}",
          tpText: "",
          tpRatio: "1",
          tpDigit: "default"
        };
      }
      if (this.chart_style == "contain") {
        this.oseries.barGap = "-100%";
      }
      if (this.chart_type == "line" && this.chart_style == "smooth") {
        this.oseries.lineStyle = ["smooth"];
      }
      var option = this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].defaultOption.config.option;
      var option1 = this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].defaultOption.config.option1;
      if (option) {
        // var series =
        //   option[
        //     this.$store.state.chartSetting.chartList[
        //       this.$store.state.chartSetting.chartCurrent
        //     ].defaultOption.config.sindex
        //   ]
        // this.series = generator.deepCopy(option1.series)

        // 兼容之前做的图
        if (option1.sindex || option1.sindex == 0) {
          this.sindex = option1.sindex;
        } else {
          this.sindex = this.$store.state.chartSetting.chartList[
            this.$store.state.chartSetting.chartCurrent
          ].defaultOption.config.sindex;
        }
        this.totalArr = generator.deepCopy(option);
        this.series = generator.deepCopy(this.totalArr[this.sindex]);
        if (option1 && option1.comCirculation) {
          this.comCirculation = option1.comCirculation;
        } else {
          this.comCirculation = {
            start: false,
            time: "3"
          };
        }
      } else {
        this.series = generator.deepCopy(this.oseries);
        this.totalArr = generator.deepCopy(this.totalArr1);
        this.sindex = 0;
        this.tindex = 0;
      }
      return chart_id;
    },
    seriesOption() {
      if (!this.$store.state.chartSetting.chartCurrent) {
        return;
      }
      var series = this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].defaultOption.series;
      var arr = [];
      for (var i = 0; i < series.length + 1; i++) {
        if (i == 0) {
          arr[0] = "通用设置";
        } else {
          arr[i] = series[i - 1].name;
        }
      }
      if (this.chart_style == "costComposition") {
        arr.splice(1, 1);
      }
      return arr;
    },
    seriesValue: {
      get() {
        if (!this.seriesOption) {
          return;
        }
        return this.seriesOption[this.sindex];
      },
      set(val) {
        if (!this.seriesOption) {
          return;
        }
        this.sindex = this.seriesOption.findIndex(item => item == val);
        this.series = this.totalArr[this.sindex];
        // var series = this.$store.state.chartSetting.chartList[
        //   this.$store.state.chartSetting.chartCurrent
        // ].defaultOption.series
        // var customType = this.$store.state.chartSetting.chartList[
        //   this.$store.state.chartSetting.chartCurrent
        // ].defaultOption.customType
        // customType = customType ? customType : series[0].type
        // if (this.sindex == 0) {
        //   this.tindex = this.typeOption.findIndex(
        //     item => item.value == customType
        //   )
        // } else {
        //   this.tindex = this.typeOption.findIndex(
        //     item => item.value == series[this.sindex - 1].type
        //   )
        // }

        this.delMarkAdd();
      }
    },
    chart_pro: function() {
      if (!this.$store.state.chartSetting.chartCurrent) {
        return;
      }
      return this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].chartAllType.split("|")[0];
    },
    chart_type() {
      if (!this.$store.state.chartSetting.chartCurrent) {
        return;
      }
      return this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].chartAllType.split("|")[1];
    },
    chart_style() {
      if (!this.$store.state.chartSetting.chartCurrent) {
        return;
      }
      return this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].chartAllType.split("|")[2];
    },
    typeOption() {
      if (this.chart_style == "costComposition") {
        return [{ value: "bar", label: "柱状图" }];
      } else {
        return [
          { value: "line", label: "折线图" },
          { value: "bar", label: "柱状图" },
          { value: "pictorialBar", label: "象形柱图" }
        ];
      }
    },
    data() {
      if (!this.$store.state.chartSetting.chartCurrent) {
        return;
      }
      var arr = this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].defaultOption.seriesData;
      return arr;
    },
    speArr() {
      if (!this.$store.state.chartSetting.chartCurrent) {
        return;
      }
      // if (this.series.formatter == '{special}') {
      var arr = this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].defaultOption.seriesData;
      var speArr = [];
      if (arr && arr.length > 1) {
        for (var i = 0; i < arr[0].length; i++) {
          speArr.push((arr[0][i] / arr[1][i]) * 100);
        }
      }
      return speArr;
      // }
    },
    formatterOption() {
      if (this.chart_style == "stackRatio") {
        return [
          { value: "{b}", label: "仅数据" },
          { value: "{c}", label: "仅百分比" },
          { value: "{bc}", label: "系列名+百分比" },
          { value: "{pc}", label: "数据+百分比" },
          { value: "{prc}", label: "数据+人+百分比" },
          { value: "{bcd}", label: "系列名+数据+百分比" }
        ];
      } else {
        return [
          { value: "{c}", label: "仅数据" },
          { value: "{bc}", label: "系列名+数据" },
          { value: "{percent}", label: "仅百分比" },
          { value: "{special}", label: "显示左侧百分比" }
        ];
      }
    },
    type: {
      get() {
        if (!this.$store.state.chartSetting.chartCurrent) {
          return;
        }
        if (this.chart_pro == "echarts") {
          // var sindex
          // if (this.sindex == 0) {
          //   sindex = 0
          // } else {
          //   sindex = this.sindex - 1
          // }
          var series = this.$store.state.chartSetting.chartList[
            this.$store.state.chartSetting.chartCurrent
          ].defaultOption.series;
          var customType = this.$store.state.chartSetting.chartList[
            this.$store.state.chartSetting.chartCurrent
          ].defaultOption.customType;
          customType = customType ? customType : series[0].type;
          if (this.sindex == 0) {
            this.tindex = this.typeOption.findIndex(
              item => item.value == customType
            );
          } else {
            this.tindex = this.typeOption.findIndex(
              item => item.value == series[this.sindex - 1].type
            );
          }
          // // 如果是面积图,显示折线图
          // if(this.tindex == -1 && customType == 'area'){
          //   this.tindex = 0
          // }
          return this.typeOption[this.tindex].value;
        }
      },
      set(val) {
        if (!this.$store.state.chartSetting.chartCurrent) {
          return;
        }
        if (this.chart_pro == "echarts") {
          var series = this.$store.state.chartSetting.chartList[
            this.$store.state.chartSetting.chartCurrent
          ].defaultOption.series;
          this.tindex = this.typeOption.findIndex(item => item.value == val);
          if (this.sindex == 0) {
            this.$store.state.chartSetting.chartList[
              this.$store.state.chartSetting.chartCurrent
            ].defaultOption.customType = val;

            for (var i = 0; i < series.length; i++) {
              series[i].type = val;
            }
          } else {
            series[this.sindex - 1].type = val;
          }
        }
        this.delMarkAdd();
        generator.changeChartOption();
      }
    },
    // 当前系列的索引
    // sindex() {
    //   console.dir(this.seriesValue)
    //   var index = this.seriesOption.findIndex(item => {
    //     return item == this.seriesValue
    //   })
    //   // if (index > 0) {
    //   //   index = --index
    //   // }
    //   if (
    //     this.chart_style == 'costComposition' &&
    //     this.seriesValue != '通用设置'
    //   ) {
    //     index = 1
    //   }
    //   return index
    // },
    chart_style: function() {
      if (!this.$store.state.chartSetting.chartCurrent) {
        return;
      }
      var style = this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].chartAllType.split("|")[2];
      return style;
    },
    // 是否显示面积图,选图是面积图时默认显示
    show: {
      get() {
        if (!this.$store.state.chartSetting.chartCurrent) {
          return;
        }
        var flag = this.$store.state.chartSetting.chartList[
          this.$store.state.chartSetting.chartCurrent
        ].defaultOption.area;
        if (flag) {
          this.series.showArea = true;
        } else {
          this.series.showArea = false;
        }
        return this.series.showArea;
      },
      set(val) {
        if (!this.$store.state.chartSetting.chartCurrent) {
          return;
        }
        this.$store.state.chartSetting.chartList[
          this.$store.state.chartSetting.chartCurrent
        ].defaultOption.area = val;
        this.series.showArea = val;
      }
    },
    showPercent() {
      if (this.chart_style == "stackRatio" || this.chart_style == "contain") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    delMarkAdd() {
      generator.addLine = false;
      generator.addPoint = false;
      generator.addArea = false;
      var series = {
        series: this.series,
        data: this.data,
        speArr: this.speArr,
        showPercent: this.showPercent,
        totalArr: this.totalArr,
        seriesOption: this.seriesOption,
        sindex: this.sindex,
        oseries: this.oseries,
        type: this.chart_type,
        total: this.total,
        comCirculation: this.comCirculation
      };
      this.$store.commit({
        type: "updateChartOptionItem",
        router: "config",
        key: "option",
        value: this.totalArr
      });
      this.$store.commit({
        type: "updateChartOptionItem",
        router: "config",
        key: "option1",
        value: series
      });
      // var index = this.totalArr.findIndex(
      //   item => item.seriesValue == this.seriesValue
      // )
      // this.$store.commit({
      //   type: 'updateChartOptionItem',
      //   router: 'config',
      //   key: 'sindex',
      //   value: index
      // })
    },
    normalMethod() {
      // 折线图设置
      if (this.type == "line") {
        var step, smooth;
        if (this.series.lineStyle.includes("step")) {
          step = true;
        }
        if (this.series.lineStyle.includes("smooth")) {
          smooth = true;
        }
        // 折线图通用设置
        if (this.seriesValue == "通用设置") {
          if (this.series.lineWidth != "custom") {
            this.$store.commit({
              type: "updateChartOptionItem",
              router: "series",
              key: "lineStyle/width",
              value: this.series.lineWidth
            });
          }
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "lineStyle/type",
            value: this.series.lineType
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "lineStyle/color",
            value: this.series.lineColor
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "step",
            value: step
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "smooth",
            value: smooth
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "showSymbol",
            value: this.series.showSymbol
          });
          if (this.series.symbolSize != "custom") {
            this.$store.commit({
              type: "updateChartOptionItem",
              router: "series",
              key: "symbolSize",
              value: this.series.symbolSize
            });
          }
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "itemStyle",
            value: {
              color: this.series.itemColor
            }
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "symbol",
            value: this.series.symbol
          });
          // 单独设置
        } else {
          if (this.series.lineWidth != "custom") {
            this.$store.commit({
              type: "updateChartOptionItem",
              router: "series",
              key: "lineStyle/width/" + (this.sindex - 1),
              value: this.series.lineWidth
            });
          }
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "lineStyle/type/" + (this.sindex - 1),
            value: this.series.lineType
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "lineStyle/color/" + (this.sindex - 1),
            value: this.series.lineColor
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "step/" + (this.sindex - 1),
            value: step
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "smooth/" + (this.sindex - 1),
            value: smooth
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "showSymbol/" + (this.sindex - 1),
            value: this.series.showSymbol
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "itemStyle/" + (this.sindex - 1),
            value: {
              color: this.series.itemColor
            }
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "symbol/" + (this.sindex - 1),
            value: this.series.symbol
          });
          if (this.series.symbolSize != "custom") {
            this.$store.commit({
              type: "updateChartOptionItem",
              router: "series",
              key: "symbolSize/" + (this.sindex - 1),
              value: this.series.symbolSize
            });
          }
        }
      }
      // 柱状图设置
      if (this.type == "bar" || this.type == "pictorialBar") {
        if (this.seriesValue == "通用设置") {
          if (this.series.barWidth != "custom") {
            this.$store.commit({
              type: "updateChartOptionItem",
              router: "series",
              key: "barWidth",
              value: this.series.barWidth
            });
          }
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "itemStyle/color",
            value: this.series.barColor
          });
          // if (this.series.barGap != 'custom') {
          //   this.$store.commit({
          //     type: 'updateChartOptionItem',
          //     router: 'series',
          //     key: 'barGap',
          //     value: this.series.barGap
          //   })
          // }
          if (this.series.barCategoryGap != "custom") {
            this.$store.commit({
              type: "updateChartOptionItem",
              router: "series",
              key: "barCategoryGap",
              value: this.series.barCategoryGap
            });
          }
        } else {
          if (this.series.barWidth != "custom") {
            this.$store.commit({
              type: "updateChartOptionItem",
              router: "series",
              key: "barWidth/" + (this.sindex - 1),
              value: this.series.barWidth
            });
          }
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "itemStyle/color",
            index: this.sindex - 1,
            value: this.series.barColor
          });
          if (this.series.barCategoryGap != "custom") {
            this.$store.commit({
              type: "updateChartOptionItem",
              router: "series",
              key: "barCategoryGap/" + (this.sindex - 1),
              value: this.series.barCategoryGap
            });
          }
          // if (this.series.barGap != 'custom') {
          //   this.$store.commit({
          //     type: 'updateChartOptionItem',
          //     router: 'series',
          //     key: 'barGap/' + (this.sindex - 1),
          //     value: this.series.barGap
          //   })
          // }
        }
      }
      // 通用设置
      var fontWeight, fontStyle;
      if (this.series.fontPlace.indexOf("bold") > -1) {
        fontWeight = true;
      }
      if (this.series.fontPlace.indexOf("italic") > -1) {
        fontStyle = true;
      }
      var fun;
      if (this.series.formatter == "{special}") {
        fun = function(...args) {
          // var series = args[0];
          // var params = args[1];
          // var data = series.speArr[params.dataIndex];
          // var flag = false;
          // // 如果data是NaN,data设为0
          // if (data !== data) {
          //   flag = true;
          // }
          // if (series.series.valueDigit == "default") {
          //   if (flag) {
          //     return "---";
          //   } else {
          //     return (
          //       series.series.prefixVal.trim() +
          //       luckysheet.floatTool.multiply(data, series.series.valueRatio) +
          //       "%" +
          //       series.series.suffixVal.trim()
          //     );
          //   }
          // } else {
          //   if (flag) {
          //     return "---";
          //   } else {
          //     return (
          //       series.series.prefixVal.trim() +
          //       luckysheet.floatTool
          //         .multiply(data, series.series.valueRatio)
          //         .toFixed(series.series.valueDigit) +
          //       "%" +
          //       series.series.suffixVal.trim()
          //     );
          //   }
          // }

          var series = args[0]
          var index = args[1]
          var params = args[2]
          var option = series.totalArr[index + 1]
          var data = series.speArr[params.dataIndex]
          var flag = false
          // 如果data是NaN,data设为0
          if (data !== data) {
            flag = true
          }
          if (option.valueDigit == 'default') {
            if (flag) {
              return '---'
            } else {
              return (
                option.prefixVal.trim() +
                luckysheet.floatTool.multiply(data, option.valueRatio) +
                '%' +
                option.suffixVal.trim()
              )
            }
          } else {
            if (flag) {
              return '---'
            } else {
              return (
                option.prefixVal.trim() +
                luckysheet.floatTool
                  .multiply(data, option.valueRatio)
                  .toFixed(option.valueDigit) +
                '%' +
                option.suffixVal.trim()
              )
            }
          }
        };
      }
      if (this.series.formatter == "{c}") {
        fun = function(...args) {
          // var series = args[0];
          // var params = args[1];
          // // 如果是负数,加个负号
          // var flag =
          //   series.data[params.seriesIndex][params.dataIndex] >= 0
          //     ? true
          //     : false;

          // if (series.series.valueDigit == "default") {
          //   if (params.value == 0 && series.type == "bar") {
          //     return "";
          //   } else {
          //     return (
          //       series.series.prefixVal.trim() +
          //       (flag ? "" : "-") +
          //       luckysheet.floatTool.multiply(
          //         params.value,
          //         series.series.valueRatio
          //       ) +
          //       (series.showPercent ? "%" : "") +
          //       series.series.suffixVal.trim()
          //     );
          //   }
          // } else {
          //   if (params.value == 0 && series.type == "bar") {
          //     return "";
          //   } else {
          //     return (
          //       series.series.prefixVal.trim() +
          //       (flag ? "" : "-") +
          //       luckysheet.floatTool
          //         .multiply(params.value, series.series.valueRatio)
          //         .toFixed(series.series.valueDigit) +
          //       (series.showPercent ? "%" : "") +
          //       series.series.suffixVal.trim()
          //     );
          //   }
          // }

          var series = args[0]
          var index = args[1]
          var params = args[2]
          var option = series.totalArr[index + 1]
          // 如果是负数,加个负号
          var flag =
            series.data[params.seriesIndex][params.dataIndex] >= 0
              ? true
              : false

          if (option.valueDigit == 'default') {
            if (params.value == 0) {
              return ''
            } else {
              return (
                option.prefixVal.trim() +
                (flag ? '' : '-') +
                luckysheet.floatTool.multiply(params.value, option.valueRatio) +
                (series.showPercent ? '%' : '') +
                option.suffixVal.trim()
              )
            }
          } else {
            if (params.value == 0) {
              return ''
            } else {
              return (
                option.prefixVal.trim() +
                (flag ? '' : '-') +
                luckysheet.floatTool
                  .multiply(params.value, option.valueRatio)
                  .toFixed(option.valueDigit) +
                (series.showPercent ? '%' : '') +
                option.suffixVal.trim()
              )
            }
          }
        };

      }

      if (this.series.formatter == "{bc}") {
        fun = function(...args) {
          // var series = args[0];
          // var params = args[1];
          // if (series.series.valueDigit == "default") {
          //   return (
          //     params.seriesName +
          //     series.series.prefixVal.trim() +
          //     luckysheet.floatTool.multiply(
          //       params.value,
          //       series.series.valueRatio
          //     ) +
          //     (series.showPercent ? "%" : "") +
          //     series.series.suffixVal.trim()
          //   );
          // } else {
          //   return (
          //     params.seriesName +
          //     series.series.prefixVal.trim() +
          //     luckysheet.floatTool
          //       .multiply(params.value, series.series.valueRatio)
          //       .toFixed(series.series.valueDigit) +
          //     (series.showPercent ? "%" : "") +
          //     series.series.suffixVal.trim()
          //   );
          // }

          var series = args[0]
          var index = args[1]
          var params = args[2]
          var option = series.totalArr[index + 1]
          if (option.valueDigit == 'default') {
            return (
              params.seriesName +
              option.prefixVal.trim() +
              luckysheet.floatTool.multiply(params.value, option.valueRatio) +
              (series.showPercent ? '%' : '') +
              option.suffixVal.trim()
            )
          } else {
            return (
              params.seriesName +
              option.prefixVal.trim() +
              luckysheet.floatTool
                .multiply(params.value, option.valueRatio)
                .toFixed(option.valueDigit) +
              (series.showPercent ? '%' : '') +
              option.suffixVal.trim()
            )
          }

        };

      }
      if (this.series.formatter == "{bcd}") {
        fun = function(...args) {
          // var series = args[0];
          // var params = args[1];
          // var flag =
          //   series.data[params.seriesIndex][params.dataIndex] >= 0
          //     ? true
          //     : false;
          // if (series.series.valueDigit == "default") {
          //   var data = luckysheet.floatTool.multiply(
          //     series.data[params.seriesIndex][params.dataIndex],
          //     series.series.valueRatio
          //   );
          //   if (parseInt(Math.abs(data) / 10000) > 0) {
          //     data = data / 10000 + "万";
          //   }
          //   // if (parseInt(data).toString().length >= 9) {
          //   //   data = data / 100000000 + '亿'
          //   // }
          //   return (
          //     params.seriesName +
          //     "\n" +
          //     "\n" +
          //     series.series.prefixVal.trim() +
          //     data +
          //     series.series.suffixVal.trim() +
          //     "  " +
          //     (flag ? "" : "-") +
          //     params.value +
          //     "%"
          //   );
          // } else {
          //   var data = luckysheet.floatTool
          //     .multiply(
          //       series.data[params.seriesIndex][params.dataIndex],
          //       series.series.valueRatio
          //     )
          //     .toFixed(series.series.valueDigit);
          //   if (parseInt(Math.abs(data) / 10000) > 0) {
          //     data = (data / 10000).toFixed(series.series.valueDigit) + "万";
          //   }
          //   // if (parseInt(data).toString().length >= 9) {
          //   //   data = (data / 100000000).toFixed(series.series.valueDigit) + '亿'
          //   // }
          //   return (
          //     params.seriesName +
          //     "\n" +
          //     "\n" +
          //     series.series.prefixVal.trim() +
          //     data +
          //     series.series.suffixVal.trim() +
          //     "  " +
          //     (flag ? "" : "-") +
          //     Number(params.value).toFixed(series.series.valueDigit) +
          //     "%"
          //   );
          // }

          var series = args[0]
          var index = args[1]
          var params = args[2]
          var option = series.totalArr[index + 1]
          var flag =
            series.data[params.seriesIndex][params.dataIndex] >= 0
              ? true
              : false
          if (option.valueDigit == 'default') {
            var data = luckysheet.floatTool.multiply(
              series.data[params.seriesIndex][params.dataIndex],
              option.valueRatio
            )
            if (parseInt(Math.abs(data) / 10000) > 0) {
              data = data / 10000 + '万'
            }
            // if (parseInt(data).toString().length >= 9) {
            //   data = data / 100000000 + '亿'
            // }
            return (
              params.seriesName +
              '\n' +
              '\n' +
              option.prefixVal.trim() +
              data +
              option.suffixVal.trim() +
              '  ' +
              (flag ? '' : '-') +
              params.value +
              '%'
            )
          } else {
            var data = luckysheet.floatTool
              .multiply(
                series.data[params.seriesIndex][params.dataIndex],
                option.valueRatio
              )
              .toFixed(option.valueDigit)
            if (parseInt(Math.abs(data) / 10000) > 0) {
              data = (data / 10000).toFixed(option.valueDigit) + '万'
            }
            // if (parseInt(data).toString().length >= 9) {
            //   data = (data / 100000000).toFixed(option.valueDigit) + '亿'
            // }
            return (
              params.seriesName +
              '\n' +
              '\n' +
              option.prefixVal.trim() +
              data +
              option.suffixVal.trim() +
              '  ' +
              (flag ? '' : '-') +
              Number(params.value).toFixed(option.valueDigit) +
              '%'
            )
          }

        };

      }
      if (this.series.formatter == "{b}") {
        fun = function(...args) {
          // var series = args[0];
          // var params = args[1];
          // if (series.series.valueDigit == "default") {
          //   var data = luckysheet.floatTool.multiply(
          //     series.data[params.seriesIndex][params.dataIndex],
          //     series.series.valueRatio
          //   );
          //   if (parseInt(Math.abs(data) / 10000) > 0) {
          //     data = data / 10000 + "万";
          //   }
          //   // if (parseInt(data).toString().length >= 9) {
          //   //   data = data / 100000000 + '亿'
          //   // }
          //   return (
          //     series.series.prefixVal.trim() +
          //     data +
          //     series.series.suffixVal.trim()
          //   );
          // } else {
          //   var data = luckysheet.floatTool
          //     .multiply(
          //       series.data[params.seriesIndex][params.dataIndex],
          //       series.series.valueRatio
          //     )
          //     .toFixed(series.series.valueDigit);
          //   if (parseInt(Math.abs(data) / 10000) > 0) {
          //     data = (data / 10000).toFixed(series.series.valueDigit) + "万";
          //   }
          //   // if (parseInt(data).toString().length >= 9) {
          //   //   data = (data / 100000000).toFixed(series.series.valueDigit) + '亿'
          //   // }

          //   return (
          //     series.series.prefixVal.trim() +
          //     data +
          //     series.series.suffixVal.trim()
          //   );
          // }

            var series = args[0]
            var index = args[1]
            var params = args[2]
            var option = series.totalArr[index + 1]
            if (option.valueDigit == 'default') {
              var data = luckysheet.floatTool.multiply(
                series.data[params.seriesIndex][params.dataIndex],
                option.valueRatio
              )
              if (parseInt(Math.abs(data) / 10000) > 0) {
                data = data / 10000 + '万'
              }
              // if (parseInt(data).toString().length >= 9) {
              //   data = data / 100000000 + '亿'
              // }
              return option.prefixVal.trim() + data + option.suffixVal.trim()
            } else {
              var data = luckysheet.floatTool
                .multiply(
                  series.data[params.seriesIndex][params.dataIndex],
                  option.valueRatio
                )
                .toFixed(option.valueDigit)
              if (parseInt(Math.abs(data) / 10000) > 0) {
                data = (data / 10000).toFixed(option.valueDigit) + '万'
              }
              // if (parseInt(data).toString().length >= 9) {
              //   data = (data / 100000000).toFixed(option.valueDigit) + '亿'
              // }

              return option.prefixVal.trim() + data + option.suffixVal.trim()
            }

        };

      }
      if (this.series.formatter == "{pc}") {
        fun = function(...args) {
          // var series = args[0];
          // var params = args[1];
          // if (series.series.valueDigit == "default") {
          //   var data = luckysheet.floatTool.multiply(
          //     series.data[params.seriesIndex][params.dataIndex],
          //     series.series.valueRatio
          //   );
          //   if (parseInt(Math.abs(data) / 10000) > 0) {
          //     data = data / 10000 + "万";
          //   }
          //   // if (parseInt(data).toString().length >= 9) {
          //   //   data = data / 100000000 + '亿'
          //   // }
          //   return (
          //     data +
          //     "  " +
          //     series.series.prefixVal.trim() +
          //     params.value +
          //     "%" +
          //     series.series.suffixVal.trim()
          //   );
          // } else {
          //   var data = luckysheet.floatTool
          //     .multiply(
          //       series.data[params.seriesIndex][params.dataIndex],
          //       series.series.valueRatio
          //     )
          //     .toFixed(series.series.valueDigit);
          //   if (parseInt(Math.abs(data) / 10000) > 0) {
          //     data = (data / 10000).toFixed(series.series.valueDigit) + "万";
          //   }
          //   // if (parseInt(data).toString().length >= 9) {
          //   //   data = (data / 100000000).toFixed(series.series.valueDigit) + '亿'
          //   // }
          //   return (
          //     data +
          //     "  " +
          //     series.series.prefixVal.trim() +
          //     Number(params.value).toFixed(series.series.valueDigit) +
          //     "%" +
          //     series.series.suffixVal.trim()
          //   );
          // }

            var series = args[0]
            var index = args[1]
            var params = args[2]
            var option = series.totalArr[index + 1]
            if (option.valueDigit == 'default') {
              var data = luckysheet.floatTool.multiply(
                series.data[params.seriesIndex][params.dataIndex],
                option.valueRatio
              )
              if (parseInt(Math.abs(data) / 10000) > 0) {
                data = data / 10000 + '万'
              }
              // if (parseInt(data).toString().length >= 9) {
              //   data = data / 100000000 + '亿'
              // }
              return (
                data +
                '  ' +
                option.prefixVal.trim() +
                params.value +
                '%' +
                option.suffixVal.trim()
              )
            } else {
              var data = luckysheet.floatTool
                .multiply(
                  series.data[params.seriesIndex][params.dataIndex],
                  option.valueRatio
                )
                .toFixed(option.valueDigit)
              if (parseInt(Math.abs(data) / 10000) > 0) {
                data = (data / 10000).toFixed(option.valueDigit) + '万'
              }
              // if (parseInt(data).toString().length >= 9) {
              //   data = (data / 100000000).toFixed(option.valueDigit) + '亿'
              // }
              return (
                data +
                '  ' +
                option.prefixVal.trim() +
                Number(params.value).toFixed(option.valueDigit) +
                '%' +
                option.suffixVal.trim()
              )
            }
        };

      }
      if (this.series.formatter == "{prc}") {
        fun = function(...args) {
          // var series = args[0];
          // var params = args[1];
          // if (series.series.valueDigit == "default") {
          //   var data = luckysheet.floatTool.multiply(
          //     series.data[params.seriesIndex][params.dataIndex],
          //     series.series.valueRatio
          //   );
          //   if (parseInt(Math.abs(data) / 10000) > 0) {
          //     data = data / 10000 + "万";
          //   }
          //   // if (parseInt(data).toString().length >= 9) {
          //   //   data = data / 100000000 + '亿'
          //   // }
          //   return (
          //     data +
          //     "人  " +
          //     series.series.prefixVal.trim() +
          //     params.value +
          //     "%" +
          //     series.series.suffixVal.trim()
          //   );
          // } else {
          //   var data = luckysheet.floatTool
          //     .multiply(
          //       series.data[params.seriesIndex][params.dataIndex],
          //       series.series.valueRatio
          //     )
          //     .toFixed(series.series.valueDigit);
          //   if (parseInt(Math.abs(data) / 10000) > 0) {
          //     data = (data / 10000).toFixed(series.series.valueDigit) + "万";
          //   }
          //   // if (parseInt(data).toString().length >= 9) {
          //   //   data = (data / 100000000).toFixed(series.series.valueDigit) + '亿'
          //   // }
          //   return (
          //     data +
          //     "人  " +
          //     series.series.prefixVal.trim() +
          //     Number(params.value).toFixed(series.series.valueDigit) +
          //     "%" +
          //     series.series.suffixVal.trim()
          //   );
          // }

            var series = args[0]
            var index = args[1]
            var params = args[2]
            var option = series.totalArr[index + 1]
            if (option.valueDigit == 'default') {
              var data = luckysheet.floatTool.multiply(
                series.data[params.seriesIndex][params.dataIndex],
                option.valueRatio
              )
              if (parseInt(Math.abs(data) / 10000) > 0) {
                data = data / 10000 + '万'
              }
              // if (parseInt(data).toString().length >= 9) {
              //   data = data / 100000000 + '亿'
              // }
              return (
                data +
                '人  ' +
                option.prefixVal.trim() +
                params.value +
                '%' +
                option.suffixVal.trim()
              )
            } else {
              var data = luckysheet.floatTool
                .multiply(
                  series.data[params.seriesIndex][params.dataIndex],
                  option.valueRatio
                )
                .toFixed(option.valueDigit)
              if (parseInt(Math.abs(data) / 10000) > 0) {
                data = (data / 10000).toFixed(option.valueDigit) + '万'
              }
              // if (parseInt(data).toString().length >= 9) {
              //   data = (data / 100000000).toFixed(option.valueDigit) + '亿'
              // }
              return (
                data +
                '人  ' +
                option.prefixVal.trim() +
                Number(params.value).toFixed(option.valueDigit) +
                '%' +
                option.suffixVal.trim()
              )
            }
        };

      }
      if (this.series.formatter == "{percent}") {
        fun = function(...args) {
          // var series = args[0];
          // var params = args[1];

          // var total = [];
          // for (var i = 0; i < series.data.length; i++) {
          //   var sum = 0;
          //   for (var j = 0; j < series.data[i].length; j++) {
          //     sum += series.data[i][j];
          //   }
          //   total.push(sum);
          // }

          // if (series.series.valueDigit == "default") {
          //   var data = luckysheet.floatTool.multiply(
          //     series.data[params.seriesIndex][params.dataIndex],
          //     series.series.valueRatio
          //   );

          //   return (
          //     series.series.prefixVal.trim() +
          //     (data / total[params.seriesIndex]) * 100 +
          //     "%" +
          //     series.series.suffixVal.trim()
          //   );
          // } else {
          //   var data = luckysheet.floatTool.multiply(
          //     series.data[params.seriesIndex][params.dataIndex],
          //     series.series.valueRatio
          //   );

          //   return (
          //     series.series.prefixVal.trim() +
          //     ((data / total[params.seriesIndex]) * 100).toFixed(
          //       series.series.valueDigit
          //     ) +
          //     "%" +
          //     series.series.suffixVal.trim()
          //   );
          // }

          var series = args[0];
          var index = args[1]
          var params = args[2];
          var option = series.totalArr[index + 1]

          var total = [];
          for (var i = 0; i < series.data.length; i++) {
            var sum = 0;
            for (var j = 0; j < series.data[i].length; j++) {
              sum += series.data[i][j];
            }
            total.push(sum);
          }

          if (option.valueDigit == "default") {
            var data = luckysheet.floatTool.multiply(
              series.data[params.seriesIndex][params.dataIndex],
              option.valueRatio
            );

            return (
              option.prefixVal.trim() +
              (data / total[params.seriesIndex]) * 100 +
              "%" +
              option.suffixVal.trim()
            );
          } else {
            var data = luckysheet.floatTool.multiply(
              series.data[params.seriesIndex][params.dataIndex],
              option.valueRatio
            );

            return (
              option.prefixVal.trim() +
              ((data / total[params.seriesIndex]) * 100).toFixed(
                option.valueDigit
              ) +
              "%" +
              option.suffixVal.trim()
            );
          }
        };
      }

      if (this.seriesValue == "通用设置") {
        var obj = {
          show: this.series.showLabel,
          fontSize: this.series.fontSize,
          color: this.series.fzColor,
          fontStyle: fontStyle ? "italic" : "normal",
          fontWeight: fontWeight ? "bold" : "normal",
          formatter: fun,
          formatter1: typeof fun == "function" ? fun + "" : fun,
          valueRatio: this.series.valueRatio,
          valueDigit: this.series.valueDigit,
          prefixVal: this.series.prefixVal,
          suffixVal: this.series.suffixVal,
          align: this.series.align,
          compatibility: true
        };
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "label",
          value: generator.deepCopy(obj)
        });
        if (this.series.textPos != "custom") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "label/position",
            value: this.series.textPos
          });
        } else {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "label/position",
            value: [this.series.offsetX + "%", this.series.offsetY + "%"]
          });
        }
        for (var a = 0; a < this.totalArr.length; a++) {
          this.totalArr[a] = generator.deepCopy(this.series);
        }
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "label/" + (this.sindex - 1),
          value: {
            show: this.series.showLabel,
            fontSize: this.series.fontSize,
            color: this.series.fzColor,
            fontStyle: fontStyle ? "italic" : "normal",
            fontWeight: fontWeight ? "bold" : "normal",
            formatter: fun,
            formatter1: typeof fun == "function" ? fun + "" : fun,
            valueRatio: this.series.valueRatio,
            valueDigit: this.series.valueDigit,
            prefixVal: this.series.prefixVal,
            suffixVal: this.series.suffixVal,
            align: this.series.align,
            compatibility: true
          }
        });
        if (this.series.textPos != "custom") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "label/position/" + (this.sindex - 1),
            value: this.series.textPos
          });
        } else {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "label/position/" + (this.sindex - 1),
            value: [this.series.offsetX + "%", this.series.offsetY + "%"]
          });
        }
        var sindex = this.seriesOption.findIndex(
          item => item == this.seriesValue
        );
        this.totalArr[sindex] = generator.deepCopy(this.series);
      }
    },
    // exType(newV) {
    //   var series = this.$store.state.chartSetting.chartList[
    //     this.$store.state.chartSetting.chartCurrent
    //   ].defaultOption.series
    //   if (this.seriesValue == '通用设置') {
    //     for (var i = 0; i < series.length; i++) {
    //       series[i].type = newV
    //     }
    //   } else {
    //     series[this.sindex - 1].type = newV
    //   }
    //   this.normalMethod()
    //   this.delMarkAdd()
    //   generator.changeChartOption()
    // },
    exlineWidth(newV) {
      if (newV != "custom") {
        this.normalMethod();
        generator.changeChartOption();
      }
      this.delMarkAdd();
    },
    exlineColor() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    excusLineWidth(newV) {
      this.normalMethod();
      if (this.seriesValue == "通用设置") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "lineStyle/width",
          value: newV
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "lineStyle/width",
          index: this.sindex - 1,
          value: newV
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exlineType() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exlineStyle() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exshowSymbol() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exsymbolSize(newV) {
      if (newV != "custom") {
        this.normalMethod();
        generator.changeChartOption();
      }
      this.delMarkAdd();
    },
    excusSymbolSize(newV) {
      this.normalMethod();
      if (this.seriesValue == "通用设置") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "symbolSize",
          value: newV
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusSymbolSize",
          value: newV
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "symbolSize/" + (this.sindex - 1),
          value: newV
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusSymbolSize/" + (this.sindex - 1),
          value: newV
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exsymbol() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exbarWidth(newV) {
      this.delMarkAdd();
      if (newV != "custom") {
        this.normalMethod();
        generator.changeChartOption();
      }
    },
    excusBarWidth(newV) {
      this.normalMethod();
      if (this.seriesValue == "通用设置") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barWidth",
          value: newV
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusbarWidth",
          value: newV
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barWidth/" + (this.sindex - 1),
          value: newV
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusbarWidth/" + (this.sindex - 1),
          value: newV
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exbarMinHeight(newV) {
      this.delMarkAdd();
      if (newV != "custom") {
        if (this.seriesValue == "通用设置") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "barMinHeight",
            value: this.series.barMinHeight
          });
        } else {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "barMinHeight/" + (this.sindex - 1),
            value: this.series.barMinHeight
          });
        }
        this.delMarkAdd();
        generator.changeChartOption();
      }
    },
    excusBarMinHeight(newV) {
      if (this.seriesValue == "通用设置") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barMinHeight",
          value: newV
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusbarMinHeight",
          value: newV
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barMinHeight/" + (this.sindex - 1),
          value: newV
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusbarMinHeight/" + (this.sindex - 1),
          value: newV
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exbarGap(newV) {
      if (newV != "custom") {
        if (this.seriesValue == "通用设置") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "barGap",
            value: this.series.barGap
          });
        } else {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "barGap/" + (this.sindex - 1),
            value: this.series.barGap
          });
        }
        generator.changeChartOption();
      }
      this.delMarkAdd();
    },
    excusBarGap(newV) {
      this.normalMethod();
      if (this.seriesValue == "通用设置") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barGap",
          value: newV + "%"
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusbarGap",
          value: newV + "%"
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barGap/" + (this.sindex - 1),
          value: newV + "%"
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusbarGap/" + (this.sindex - 1),
          value: newV + "%"
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exbarCategoryGap() {
      if (newV != "custom") {
        this.normalMethod();
        generator.changeChartOption();
      }
      this.delMarkAdd();
    },
    excusbarCategoryGap(val) {
      this.normalMethod();
      if (this.seriesValue == "通用设置") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barCategoryGap",
          value: val + "%"
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barCategoryGap/" + (this.sindex - 1),
          value: val + "%"
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exshowLabel() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exitemColor() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exvalueDigit(newV) {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exvalueRatio(newV) {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exsuffixVal(newV) {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exprefixVal(newV) {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    extextPos() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exfontPlace() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exfzColor() {
      this.delMarkAdd();
      this.normalMethod();
      generator.changeChartOption();
    },
    exfontSize() {
      if (this.series.fontSize != "custom") {
        this.normalMethod();
        generator.changeChartOption();
      }
      this.delMarkAdd();
    },
    excustomSize(newV) {
      this.normalMethod();
      var fontWeight, fontStyle;
      if (this.series.fontPlace.indexOf("bold") > -1) {
        fontWeight = true;
      }
      if (this.series.fontPlace.indexOf("italic") > -1) {
        fontStyle = true;
      }
      if (this.seriesValue == "通用设置") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "label/fontSize",
          value: newV
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "label/fontSize/" + (this.sindex - 1),
          value: newV
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exStack(newV) {
      this.normalMethod();
      if (!newV) {
        if (this.seriesValue == "通用设置") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "stack",
            value: null
          });
        } else {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "stack/" + (this.sindex - 1),
            value: null
          });
        }
      } else {
        if (this.seriesValue == "通用设置") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "stack",
            value: this.series.stackValue
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "stack1",
            value: this.series.stackValue
          });
        } else {
          var index = this.seriesOption.findIndex(
            item => item == this.seriesValue
          );
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "stack/" + (this.sindex - 1),
            value: this.totalArr[index].stackValue
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "stack1/" + (this.sindex - 1),
            value: this.totalArr[index].stackValue
          });
        }
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exstackValue(newV) {
      this.normalMethod();
      if (this.seriesValue == "通用设置") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "stack",
          value: newV
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "stack/" + (this.sindex - 1),
          value: newV
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exbarCategoryGap(newV) {
      if (newV != "custom") {
        this.normalMethod();
        generator.changeChartOption();
      }
      this.delMarkAdd();
    },
    excusBarCategoryGap(newV) {
      this.normalMethod();
      if (this.seriesValue == "通用设置") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barCategoryGap",
          value: newV
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusbarCategoryGap",
          value: newV
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barCategoryGap/" + (this.sindex - 1),
          value: newV
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusbarCategoryGap/" + (this.sindex - 1),
          value: newV
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exArea(newV) {
      this.normalMethod();
      if (!newV) {
        if (this.seriesValue == "通用设置") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "areaStyle",
            value: null
          });
        } else {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "areaStyle/" + (this.sindex - 1),
            value: null
          });
        }
      } else {
        if (this.seriesValue == "通用设置") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "areaStyle",
            value: {
              color: this.series.areaColor
            }
          });
        } else {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "areaStyle/" + (this.sindex - 1),
            value: {
              color: this.series.areaColor
            }
          });
        }
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exbarColor() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exformatter() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exoffset() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exalign() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    excusAlign() {
      if (this.seriesValue == "通用设置") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "label/offset",
          value: [this.series.cusAlignX, this.series.cusAlignY]
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "label/offset",
          index: this.sindex - 1,
          value: [this.series.cusAlignX, this.series.cusAlignY]
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exverticalAlign(val) {
      if (val != "custom") {
        if (this.seriesValue == "通用设置") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "label/verticalAlign",
            value: val
          });
        } else {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "label/verticalAlign",
            index: this.sindex - 1,
            value: val
          });
        }
        generator.changeChartOption();
      }
      this.delMarkAdd();
    },
    exAxis(val) {
      if (this.seriesValue == "通用设置") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "yAxisIndex",
          value: val
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "yAxisIndex",
          index: this.sindex - 1,
          value: val
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exXAxis(val) {
      if (this.seriesValue == "通用设置") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "xAxisIndex",
          value: val
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "xAxisIndex",
          index: this.sindex - 1,
          value: val
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    addLevel(){
      if (this.seriesValue == "通用设置") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "z",
          value: this.series.z+1
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "z",
          index: this.sindex - 1,
          value: this.series.z+1
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exborderRadius(val) {
      if (val != "custom") {
        if (this.seriesValue == "通用设置") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "itemStyle/barBorderRadius",
            value: val
          });
        } else {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "itemStyle/barBorderRadius",
            index: this.sindex - 1,
            value: val
          });
        }
        generator.changeChartOption();
      }
      this.delMarkAdd();
    },
    excusBorderRadius() {
      if (this.seriesValue == "通用设置") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "itemStyle/barBorderRadius",
          value: [
            this.series.radius1,
            this.series.radius2,
            this.series.radius3,
            this.series.radius4
          ]
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "itemStyle/barBorderRadius",
          index: this.sindex - 1,
          value: [
            this.series.radius1,
            this.series.radius2,
            this.series.radius3,
            this.series.radius4
          ]
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exsymbol1(val) {
      if (this.seriesValue == "通用设置") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "symbol",
          value: val
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "symbol",
          index: this.sindex - 1,
          value: val
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    excirculation() {
      this.$store.commit({
        type: "updateChartOptionItem",
        router: "config",
        key: "comCirculation",
        value: this.comCirculation
      });
      this.delMarkAdd();
      generator.changeChartOption();
    },
    extpFormat() {
      this.$store.commit({
        type: "updateChartOptionItem",
        router: "series",
        key: "tpFormat",
        index: this.sindex - 1,
        value: this.series.tpFormat
      });
      this.$store.commit({
        type: "updateChartOptionItem",
        router: "series",
        key: "tpRatio",
        index: this.sindex - 1,
        value: this.series.tpRatio
      });
      this.$store.commit({
        type: "updateChartOptionItem",
        router: "series",
        key: "tpDigit",
        index: this.sindex - 1,
        value: this.series.tpDigit
      });
      this.$store.commit({
        type: "updateChartOptionItem",
        router: "series",
        key: "tpText",
        index: this.sindex - 1,
        value: this.series.tpText
      });
      this.$store.commit({
        type: "updateChartOptionItem",
        router: "series",
        key: "tpKey",
        value: this.sindex - 1
      });

      this.delMarkAdd();
      generator.changeChartOption();
    }
  }
};
</script>

<style>
</style>
