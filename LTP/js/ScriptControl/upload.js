var FileManager = function (option) {
    var vars = {
        IDFolders: '',
        urlFolders: '',
        urlFiles: '',
        urlUploadFile: '',
        urlFileInfor: '',
        urlRemoveFile: '',
        TypeFile: ''
    };
    var FolderPath = "";
    var listHA;
    this.construct = function (option) {
        $.extend(vars, option);
    };

    this.getFolderPath = function () {
        return FolderPath;
    }

    this.setTypeFile = function (i) {
        vars.TypeFile = i;
    };

    this.getTypeFile = function () {
        return vars.TypeFile;
    };

    this.setFolderID = function (i) {
        vars.IDFolders = i;
    };

    this.getFolderID = function () {
        return vars.IDFolders;
    }

    this.create = function () {
        removescroll();
        removetree();
        listHA = new DSHinhAnh();
        createtreeview();
        createscroll();

        //Them su kien
        document.getElementById('file').addEventListener('change', handleFileSelect, false);
        $("button[data-name='upload']").on("click", btn_click);
        $("button[data-name='StartUpload']").click(StartUpload);
        $(document).click(function (e) {
            var t = $(e.target);
            var p = t.parents("a[data-name='edit']");
            if (t.attr("data-name") != "nameFile" || p.length > 0) {
                $(".itemfile").not(p.parents(".itemfile")).each(function (i) {
                    var a = $(this).find('a[data-name="edit"]');
                    if (a.attr("data-flag") == "true") {
                        $(this).find('span[data-name="nameFile"]').attr("contenteditable", "false");
                        a.attr("data-flag", "false");
                        a.children().removeClass("fa-check").addClass("fa-pencil");
                    }
                });
            }
        });
    }

    var createtreeview = function () {
        $('#jstree_div')
            .jstree({
                "core": {
                    "check_callback": true,
                }
            });
        //Lấy dữ liệu folder
        $.ajax({
            url: vars.urlFolders + "?id=" + vars.IDFolders,
            type: "GET",
            dataTypes: "JSON",
            success: function (data) {
                $('#jstree_div').jstree(true).create_node(null, { "id": data.FolderID, "text": data.Name, "state": { "opened": true }, "data": data.Path, "files": data.Files, "folders": data.SubFolder }, "last");
                if (!$.isEmptyObject(data.SubFolder)) {
                    createnode(data.FolderID, data.SubFolder);
                }
                $("#jstree_div").jstree('select_node', data.FolderID);
                FolderPath = data.Path;
            }
        });
        //tạo sự kiện cho treeview
        $("#jstree_div").on('changed.jstree', treeview_change);
        $("#jstree_div").on('open_node.jstree', treeview_opennode);

    }

    var EditNameField = function (e) {
        e.preventDefault();
        var flag = $(this).attr('data-flag');
        var p = $(this).parent();
        var field = p.find('span[data-name="nameFile"]');
        if (flag == "false") {
            field.attr("contenteditable", "true");
            field.focus();
            document.execCommand('selectAll', false, null);
            $(this).attr('data-flag', true);
            $(this).children().removeClass("fa-pencil");
            $(this).children().addClass("fa-check");
        } else {
            field.attr("contenteditable", "false");
            unselecttext();
            $(this).attr('data-flag', false);
            $(this).children().addClass("fa-pencil");
            $(this).children().removeClass("fa-check");
        }
    }
    var AddAFileUpload = function (id, name, type, size) {
        return '<div class="d-f flex-column mr-5 mt-3 itemfile" data-id="' + id + '">' +
            '<div class="d-f flex-row">' +
            '<span class="text-info f-s-90 limit-word" data-name="nameFile" >' + name + '</span>' +
            '<span class="text-info f-s-90">.</span>' +
            '<span class="text-info f-s-90">' + type + '</span>' +
            '<a href="javascript:void(0)" data-name="edit" data-flag="false" class="ml-2"><i class="fa fa-pencil text-lighdark" aria-hidden="true"></i></a>' +
            '<a href="javascript:void(0)" data-name="cancelUpload" class="ml-auto"> <i class="fa fa-times text-lighdark" aria-hidden="true"></i></a>' +
            '</div>' +
            '<div class="progress-bar mt-2 mr-4">' +
            '<div class="progress-value" style="width:0%"></div>' +
            '</div>' +
            '<div class="d-f flex-row mt-2">' +
            '<span class="f-s-80 text-lighdark" data-name="percentage">0%</span>' +
            '<span class="f-s-80 text-lighdark ml-1">of ' + size + '</span>' +
            '</div>' +
            '</div>';
    }
    var unselecttext = function () {
        if (window.getSelection) {
            if (window.getSelection().empty) {  // Chrome
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {  // Firefox
                window.getSelection().removeAllRanges();
            }
        } else if (document.selection) {  // IE?
            document.selection.empty();
        }
    }
    var KeyEnter = function (e) {

        if (e.which == 13) {
            e.preventDefault();
            $(this).attr("contenteditable", "false");
            unselecttext();
        }
    }
    var treeview_opennode = function (e, data) {
        var node = $("#jstree_div").jstree(true).get_node(data.node.children[0]);
        var currChildNode = "tmp-" + data.node.id;
        if (node.id == currChildNode) {
            getFolders(data.node.id, function (obj) {
                $("#jstree_div").jstree(true).delete_node($("#jstree_div").jstree(true).get_node(currChildNode));

                if (!$.isEmptyObject(obj.Folders)) {
                    createnode(data.node.id, obj.Folders);
                }
            });

        }

    }
    var treeview_change = function (e, data) {
        var sel_node = $('#jstree_div').jstree("get_selected", true)[0];
        var files = sel_node.original.files;
        var folders = sel_node.original.folders;
        if (files == undefined && folders == undefined) {
            getFolders(data.node.id, function (obj) {
                AddListItem(obj.SubFolder, obj.Files)
            });
        } else {
            AddListItem(folders, files);
        }

    }
    $('#addFolder').on("click", function (e, data) {
        if (!$.isEmptyObject(obj.Folders)) {
            createnode(data.node.id, obj.Folders);
        }
    });
    var AddListItem = function (Folders, Files) {
        removelistview();
        if (!$.isEmptyObject(Folders)) {
            for (var i = 0; i < Folders.length; i++) {

                $('#ListView1').children().append(AddListViewItem(Folders[i].FolderID, 'Folder', Folders[i].Name, Folders[i].Path));
            }
        }
        if (!$.isEmptyObject(Files)) {
            for (var i = 0; i < Files.length; i++) {
                $('#ListView1').children().append(AddListViewItem(Files[i].FileID, 'Photo', Files[i].Name, Files[i].Path));
            }
        }
    }
    var AddListViewItem = function (id, type, name, path) {
        if (type == 'Folder') {
            path = "/Images/folder.png";
        }
        return '<div class="list-item" id="' + id + '" data-type="' + type + '" data-name="' + name + '"><div class="list-item-hover"></div>' +
            '<div class="d-f flex-column">' +
            '<div class="contain-image">' +
            '<img src="' + path + '" />' +
            '</div>' +
            '<span class="text-center pb-2">' + name + '</span>' +
            '</div>' +
            '</div>';
    };
    var getFolders = function (id, handle) {
        $.ajax({
            url: vars.urlFolders + "?id=" + id,
            type: "GET",
            dataTypes: "JSON",
            success: function (data) {
                handle(data);
            }
        });
    };
    var createnode = function (parent, obj) {
        for (i = 0; i < obj.length; i++) {
            $('#jstree_div').jstree().create_node(parent, { "id": obj[i].FolderID, "text": obj[i].Name, "data": obj[i].Path }, "last");
            $('#jstree_div').jstree().create_node(obj[i].FolderID, { "id": "tmp-" + obj[i].FolderID, "text": "" }, "last");
        }
    };
    var createscroll = function () {
        var height = $(".filemanager").height();
        var widht = $(".filemanager").width();
        itemHeight = height - $("#menu-image").outerHeight() - 2;
        //alert(itemHeight);
        $("#jstree_div").css("height", itemHeight + "px");
        $('#ListView1').slimScroll({
            height: itemHeight + "px",
            color: 'rgba(0,0,0,0.5)',
            size: '4px',
            position: 'right',
            alwaysVisible: true,
            railBorderRadius: '1px',
            borderRadius: '1px',
        });
        $("#jstree_div").slimScroll({
            height: itemHeight + "px",
            color: 'rgba(0,0,0,0.5)',
            size: '3px',
            position: 'right',
            alwaysVisible: false,
            railBorderRadius: '1px',
            borderRadius: '1px',
        });
        //itemHeight = $(".filemanager").height() - $("#menu-image").height() - $(".header").innerHeight() - 20;
        //$(".ToolUpload").css("height", itemHeight + "px");
        //$(".ToolUpload").slimScroll({
        //    height: itemHeight + "px",
        //    color: 'rgba(0,0,0,0.5)',
        //    size: '3px',
        //    position: 'right',
        //    alwaysVisible: false,
        //    railBorderRadius: '1px',
        //    borderRadius: '1px',
        //});
    }

    var removetree = function () {
        $("#jstree_div").jstree("destroy");
    }

    var removescroll = function () {
        $('.filemanager .slimScrollDiv').children().unwrap();
        $('.filemanager .slimScrollBar, .filemanager .slimScrollRail').remove();
    }

    var removelistview = function () {
        $('#ListView1').children().html("");
    }

    var removefileupload = function () {

    }
    var unselectedall = function () {
        $("#ListView1 .list-item").each(function () {

            var childitem = $(this).children(".list-item-hover");
            if (childitem.hasClass("active")) {
                childitem.removeClass("active");
            }
        });
    };
    var selected = function (listitem) {
        if (listitem.hasClass("list-item-hover") && listitem.parent().attr("data-type") == 'Folder') {
            $('#jstree_div').jstree("deselect_all", true);
            $("#jstree_div").jstree('select_node', listitem.parent().attr("id"));
        }
        if (listitem.hasClass("list-item-hover") && listitem.parent().attr("data-type") == 'Photo') {
            var id = $(".filemanager").attr("data-id");
            if (id == 1) {
                var str = listitem.parent().attr("data-name");
                var tmp = str.split(".");
                tmp = tmp[0].split("-");

                $.get(vars.urlGetImageInfor + "?id=" + tmp[tmp.length - 1], function (data, status) {
                    $(".cke_dialog_ui_hbox_first:first").find("input[type='text']").val(window.location.protocol + "//" + window.location.host + data.Path + "/" + str);
                    $(".cke_dialog_ui_hbox_first:first").find("input[type='text']").change();
                    $(".cke_dialog_ui_hbox_first:first").parent().parent().find(".cke_dialog_ui_vbox_child:fist").find("input[type='text']").val(data.Tag);
                    $(".filemanager").css("display", "none");

                    $(".filemanager").trigger("selected", [window.location.protocol + "//" + window.location.host + data.Path + "/" + str, data.Tag]);
                    $(".filemanager").off();
                    document.oncontextmenu = function () { return true; };
                    //alert($(".cke_dialog_ui_vbox_child").length);
                    return;
                });
            }
        }

    };
    var CancelUpload = function () {
        var i = $(this).parents(".itemfile");
        var id = i.attr("data-id");
        listHA.XoaAnh(id);
        i.remove();
    }
    var btn_click = function () {
        $("input[type='file']").trigger("click");
    }

    var StartUpload = function () {
        var path = $('#jstree_div').jstree("get_selected", true)[0].data;

        for (var i = 0; i < listHA.Count(); i++) {
            var item = listHA.list[i].obj;
            var xhr = new XMLHttpRequest();
            var formdata = new FormData();
            formdata.append("file", item.image);
            formdata.append("Path", path);
            formdata.append("File-type", item.FS);
            formdata.append("TenAnh", $(".itemfile[data-id='" + item.STT + "'] span[data-name='nameFile']").html());
            xhr.open('POST', vars.urlUploadFile);
            if (xhr.upload) {
                (function (id) {
                    xhr.upload.addEventListener("progress", function (e) {
                        if (e.lengthComputable) {
                            var per = parseInt(e.loaded / e.total * 100);
                            $(".itemfile[data-id='" + id + "'] .progress-value").css("width", per + "%");
                            $(".itemfile[data-id='" + id + "'] span[data-name='percentage']").html(per + "%");
                        }
                    });
                })(item.STT);
            }
            xhr.send(formdata);
        }

    }

    var handleFileSelect = function (evt) {
        var files = $('#file').get(0).files;

        for (var i = 0; i < files.length; i++) {
            var f = files[i];

            var reader = new FileReader();
            var img = new HinhAnh({});
            img.obj.image = f;
            img.obj.STT = listHA.Count() + 1;
            listHA.list.push(img);
            var tmp = listHA.Count() - 1;
            // Closure to capture the file information.
            reader.onload = (function (theFile) {
                var str = theFile.name.split('.');
                listHA.list[tmp].obj.FS = str[str.length - 1]
                str.splice(str.length - 1, 1);
                listHA.list[tmp].obj.TenAnh = str.join("");
                var fSize = img.obj.image.size;
                var fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
                var j = 0;
                while (fSize > 900) { fSize /= 1024; j++; }
                var s = (Math.round(fSize * 100) / 100) + " " + fSExt[j];
                $(".ToolUpload").append(AddAFileUpload(img.obj.STT, img.obj.TenAnh, img.obj.FS, s));
                $(".itemfile[data-id='" + img.obj.STT + "']  a[data-name='edit']").click(EditNameField);
                $(".itemfile[data-id='" + img.obj.STT + "']  span[data-name='nameFile']").keypress(KeyEnter);
                $(".itemfile[data-id='" + img.obj.STT + "']  a[data-name='cancelUpload']").click(CancelUpload);


            })(f);
            reader.readAsDataURL(f);
        }
        $('#file').val("");
        // console.log(listHA.list);
    };

    this.construct(option);

}
var HinhAnh = function (option) {
    this.obj = {
        STT: '',
        FS: '',
        TenAnh: '',
        size: '',
        image: undefined
    };
    this.construct = function (option) {
        $.extend(this.obj, option);

    };
    this.construct(option);


}
var DSHinhAnh = function () {
    this.list;
    this.ThemAnh = function (obj) {

        this.list.push(obj);

    };
    this.construct = function () {
        this.list = new Array();
    };

    this.Count = function () {
        return this.list.length;
    };

    this.LayAnh = function (stt) {
        return this.list.find(x => x.obj.STT == stt);
    };
    this.XoaAnh = function (stt) {
        var index = this.list.findIndex(x => x.obj.STT == stt);
        this.list.splice(index, 1);

    }
    this.construct();
};



var FM = new FileManager({
    IDFolders: 'undefined',
    urlFolders: '/Admin/Upload/GetFolders',
    urlFiles: '/Admin/UploadImage/GetFolders',
    urlUploadFile: '/Admin/Upload/UploadFile',
    urlFileInfor: '/Admin/HinhAnh/GetImageByID',
    urlRemoveFile: '',
    TypeFile: 0
});