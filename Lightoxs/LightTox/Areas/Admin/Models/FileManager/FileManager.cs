using Lightoxs;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace LightTox.Areas.Admin.Models.FileManager
{
    public class FileJson
    {
        public int FileID { set; get; }
        public int Type { set; get; }
        public string Name { set; get; }
        public string Tag { set; get; }
        public string Path { set; get; }
        public int TypeFile { set; get; }
        public string CSS { set; get; }
        public string Description { set; get; }
        public FileJson()
        {
            this.FileID = 0;
            this.Type = 0;
            this.Name = "";
            this.Tag = "";
            this.Path = "";
            this.TypeFile = 0;
            this.CSS = "";
            this.Description = "";
        }
    }

    public class FolderJson
    {
        public int FolderID { set; get; }
        public List<FolderJson> SubFolder { set; get; }
        public List<FileJson> Files { set; get; }
        public string Name { set; get; }
        public string Path { set; get; }
        public int Status { set; get; }

        public FolderJson()
        {
            this.FolderID = 0;
            this.SubFolder = new List<FolderJson>();
            this.Files = new List<FileJson>();
            this.Name = "";
            this.Path = "";
            this.Status = 0;
        } 

    }

    public class FileManager
    {
        private NhoTimEntities ent;
        public FolderJson Folder { set; get; }
        public FileManager(int FolderID)
        {
            Folder = new FolderJson();
            Folder.FolderID = FolderID;
            Task t1 = Task.Run(async () => await GetFiles());
            Task t2 = Task.Run(async () => await GetFolders());
            Task t3 = Task.Run(async () => await GetFolderInfor());
            Task.WaitAll(t1, t2, t3);
        }
        private async Task GetFiles()
        {
            using (var ent = new NhoTimEntities())
            {
                ent.Configuration.LazyLoadingEnabled = false;
                Folder.Files = await ent.Files.Where(u => u.FolderID == Folder.FolderID)
                    .Select(c => new FileJson { FileID = c.FileID,
                        Type = c.Type,
                        CSS = c.CSS,
                        Description = c.Description,
                        Name = c.Name,
                        Path = c.Path,
                        Tag = c.Tag,
                        TypeFile = c.TypeFile
                    }).ToListAsync<FileJson>();
            } 
        }

        private async Task GetFolders()
        {
            using (var ent = new NhoTimEntities())
            {
                ent.Configuration.LazyLoadingEnabled = false;
                Folder.SubFolder = await ent.Folders.Where(u => u.SubFolderID == Folder.FolderID)
                    .Select(u => new FolderJson { FolderID = u.FolderID, Name = u.Name, Path = u.Path, Status = u.Status})
                    .ToListAsync<FolderJson>();
            }
        }

        private async Task GetFolderInfor()
        {
            using (var ent = new NhoTimEntities())
            {
                ent.Configuration.LazyLoadingEnabled = false;
                var p = await ent.Folders.FirstOrDefaultAsync<Folder>(u => u.FolderID == this.Folder.FolderID);
                Folder.Name = p.Name;
                Folder.Path = p.Path;
                Folder.Status = p.Status;
            }
        }

    }
}